import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';
export function usePhotoGallery() {
	const [photos, setPhotos] = useState([]);
	const [lastPhotoPath, setLastPhotoPath] = useState('');

	useEffect(() => {
		const loadSaved = async () => {
			const { value } = await Preferences.get({ key: PHOTO_STORAGE });

			const photosInPreferences = value ? JSON.parse(value) : [];
			// If running on the web...
			if (!isPlatform('hybrid')) {
				for (let photo of photosInPreferences) {
					const file = await Filesystem.readFile({
						path: photo.filepath,
						directory: Directory.Data,
					});
					// Web platform only: Load the photo as base64 data
					photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
				}
			}
			setPhotos(photosInPreferences);
		};
		loadSaved();
	}, []);

	const getPhoto = async (image_name) => {
		const { value } = await Preferences.get({ key: PHOTO_STORAGE });

		const photosInPreferences = value ? JSON.parse(value) : [];
		let returnedPhoto = null;
		// If running on the web...
		if (!isPlatform('hybrid')) {
			for (let photo of photosInPreferences) {
				if (photo.filepath === image_name) {
					const file = await Filesystem.getUri({
						path: photo.filepath,
						directory: Directory.Data,
					});
					const data = await Filesystem.readFile({
						path: file.uri,
					});
					return data.data;
					photo.webviewPath = `data:image/jpeg;base64,${data.data}`;
					return photo.webviewPath;

					return file.uri;
				}
			}
		}
		return null;
	};

	const takePhoto = async (photo) => {
		/* const photo = await Camera.getPhoto({
			resultType: CameraResultType.Uri,
			source: CameraSource.Camera,
			quality: 100,
		}); */
		// Make it work with the photo in base64 format
		const image = {
			path: photo,
			webPath: photo,
		};

		const fileName = uuid() + '.jpeg';
		const savedFileImage = await savePicture(image, fileName);
		const newPhotos = [savedFileImage, ...photos];
		setPhotos(newPhotos);
		Preferences.set({
			key: PHOTO_STORAGE,
			value: JSON.stringify(newPhotos),
		});
		return savedFileImage;
	};

	const savePicture = async (photo, fileName) => {
		let base64Data;
		// "hybrid" will detect Cordova or Capacitor;
		if (isPlatform('hybrid')) {
			const file = await Filesystem.readFile({
				path: photo.path,
			});
			base64Data = file.data;
		} else {
			base64Data = await base64FromPath(photo.webPath);
		}
		const savedFile = await Filesystem.writeFile({
			path: fileName,
			data: base64Data,
			directory: Directory.Data,
		});

		if (isPlatform('hybrid')) {
			setLastPhotoPath(savedFile.uri);

			return {
				filepath: savedFile.uri,
				webviewPath: Capacitor.convertFileSrc(savedFile.uri),
			};
		} else {
			// Use webPath to display the new image instead of base64 since it's
			// already loaded into memory
			setLastPhotoPath(photo.webPath);
			return {
				filepath: fileName,
				webviewPath: photo.webPath,
			};
		}
	};

	const deletePhoto = async (photo) => {
		// Remove this photo from the Photos reference data array
		const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

		// Update photos array cache by overwriting the existing photo array
		Preferences.set({
			key: PHOTO_STORAGE,
			value: JSON.stringify(newPhotos),
		});

		// delete photo file from filesystem
		const filename = photo.filepath.substr(
			photo.filepath.lastIndexOf('/') + 1
		);
		await Filesystem.deleteFile({
			path: filename,
			directory: Directory.Data,
		});
		setPhotos(newPhotos);
		if (photo.webviewPath === lastPhotoPath) {
			setLastPhotoPath('');
		}
	};

	return {
		deletePhoto,
		photos,
		takePhoto,
		lastPhotoPath,
		getPhoto,
	};
}

export async function base64FromPath(path) {
	const response = await fetch(path);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				reject('method did not return a string');
			}
		};
		reader.readAsDataURL(blob);
	});
}

//generate a uuid
const uuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
};
