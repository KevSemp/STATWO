import {
	IonGrid,
	IonInput,
	IonRow,
	IonCol,
	IonRouterLink,
	IonButton,
	IonIcon, useIonAlert, useIonLoading
} from '@ionic/react';
import {handleGetUserInfo, handleLogin, handleLogout, handleSignUp} from "../../utils/firebase.js";
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import styles from './RegistroView.module.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonAvatar } from '@ionic/react';
import {useState} from "react";
import { useHistory } from 'react-router';
import { logoIonic,camera } from 'ionicons/icons';

export default function RegistroView() {
	const history = useHistory();
	defineCustomElements(window);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [imgB64,setImgB64] = useState('')
	const [presentAlert] = useIonAlert();
	const [present, dismiss] = useIonLoading();
	const [avatarImage,setAvatarImage] = useState('https://ionicframework.com/docs/img/demos/avatar.svg');
	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Base64
		});

		console.log(image);
		setAvatarImage(`data:image/jpeg;base64,${image.base64String}`);
		setImgB64(image.base64String);

	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			present({
				message: 'Loading...',
				cssClass: 'custom-loading',
			});
         const response  = await handleSignUp(email,password,imgB64)
			dismiss();
			history.push('/');
		}catch (error) {
			dismiss();
			console.log(error);
		}
	}
	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding ${styles.centered_menu}`}
			>
				<IonCol size={12} class='ion-justify-content-center'>
					<div className={styles.form_container}>
						<h1>Nuevo Usuario</h1>
						<IonAvatar onClick={() => takePicture()} class="profile-pic-container">
							<img alt="Silhouette of a person's head" src={avatarImage} />
							<IonIcon  class="camera-icon" icon={camera}></IonIcon>
						</IonAvatar>
						<form onSubmit={handleSubmit}>
							<IonInput
								label='Correo electrónico'
								labelPlacement='floating'
								fill='outline'
								type='email'
								value={email}
								onIonChange={(e) => setEmail(e.target.value)}
								placeholder='Correo electrónico'
								required
							></IonInput>
							<IonInput
								label='Contraseña'
								labelPlacement='floating'
								fill='outline'
								type='password'
								value={password}
								onIonChange={(e) => setPassword(e.target.value)}
								placeholder='Contraseña'
								required
							></IonInput>
							{/*<IonInput
								label='Confirmar Contraseña'
								labelPlacement='floating'
								fill='outline'
								type='password'
								placeholder='Confirmar Contraseña'
								required
							></IonInput>*/}

							<IonButton expand='block' type='submit'>
								Registrarse
							</IonButton>
							<span className='ion-margin-top'>
								¿Ya tienes cuenta?
								<IonRouterLink
									routerLink='/login'
									routerDirection='root'
								>
									<span> Inicia Sesión</span>
								</IonRouterLink>
							</span>
						</form>
					</div>
				</IonCol>
			</IonGrid>
		</BasicLayout>
	);
}
