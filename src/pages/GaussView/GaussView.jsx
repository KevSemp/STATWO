import GaussBell from '../../components/GaussBell/GaussBell';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const saveGeneratedImage = async (imageData, format = 'jpeg') => {
	// Asegúrate de que imageData esté en formato base64

	// Escribe el archivo en el directorio de datos
	const fileName = new Date().getTime() + '.' + format;
	await Filesystem.writeFile({
		path: 'secrets/text.txt',
		data: 'This is a test',
		directory: Directory.Documents,
		encoding: Encoding.UTF8,
	});
};
export default function GaussView() {
	const graphicRef = useRef(null);
	const handleClick = async () => {
		const canvas = await html2canvas(graphicRef.current);
		let imgData = canvas.toDataURL('image/png');
		let blob = await fetch(imgData).then((r) => r.blob());
		console.log(blob);
		const savedImageFile = await saveGeneratedImage(blob, 'png');
		console.log(savedImageFile);
	};
	const mean = -100;
	const z = 1.76 + mean;
	const alpha1 = -12.76 + mean;
	const alpha2 = 12.76 + mean;
	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding`}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
					width: '100%',
				}}
			>
				<IonCol>
					<IonRow class='ion-justify-content-center' ref={graphicRef}>
						<GaussBell
							z={z}
							xLimit={25}
							mean={mean}
							alpha1={alpha1}
							alpha2={alpha2}
						/>
					</IonRow>
					<IonRow class='ion-justify-content-center'>
						<IonButton onClick={handleClick}>Descargar</IonButton>
					</IonRow>
				</IonCol>
			</IonGrid>
		</BasicLayout>
	);
}
