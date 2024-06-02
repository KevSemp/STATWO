import {
	IonGrid,
	IonInput,
	IonRow,
	IonCol,
	IonRouterLink,
	IonButton,
} from '@ionic/react';
import { useEffect, useMemo, useState, useRef } from 'react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import {handleLogin,handleGetUserInfo,handleLogout,createCollection,saveResult} from "../../utils/firebase.js";
import styles from './LoginView.module.css';
import { useIonLoading,useIonAlert } from '@ionic/react';
import {useHistory} from "react-router";

export default function LoginView() {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [present, dismiss] = useIonLoading();
	const [presentAlert] = useIonAlert();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			loading();
			const response = await handleLogin(email,password);
			dismiss();
			history.push('/');

		}catch (error) {
			dismiss();
			console.log(error);
			presentAlert({
				header: 'Error',
				cssClass: 'my-custom-class',
				message: 'Credenciales Incorrectas',
				buttons: ['OK'],
			})

			return;

		}
	}

	const loading = () => {
		present({
			message: 'Loading...',
			cssClass: 'custom-loading',
		});
	}

	const handleUserChange = (e) => {
		console.log(e.value);
		console.log(e.target.value);
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e)=>{
		console.log(e.value);
		console.log(e.target.value);
		setPassword(e.target.value);
	}

	const prueba = (e)  => {
		console.log(e);
	}

	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding ${styles.centered_menu}`}
			>
				<IonCol size={12} class='ion-justify-content-center'>
					<div className={styles.form_container}>
						<h1>Iniciar Sesión</h1>
						<form onSubmit={handleSubmit}>
							<IonInput
								label='Correo electrónico'
								labelPlacement='floating'
								fill='outline'
								type='text'
								value={email}
								onIonInput={(e) => setEmail(e.target.value)}
								placeholder='Correo electrónico'
								required
							></IonInput>
							<IonInput
								label='Contraseña'
								labelPlacement='floating'
								fill='outline'
								type='password'
								value={password}
								onIonInput={(e) => setPassword(e.target.value)}
								placeholder='Contraseña'
								required
							></IonInput>
							<IonRouterLink routerLink='/recuperar'>
								<span>¿Olvidaste tu contraseña?</span>
							</IonRouterLink>
							<IonButton expand='block' type='submit'>
								Iniciar sesión
							</IonButton>
							<span className='ion-margin-top'>
								¿No tienes cuenta?
								<IonRouterLink
									routerLink='/registro'
									routerDirection='root'
								>
									<span> Regístrate</span>
								</IonRouterLink>
							</span>
						</form>
					</div>
				</IonCol>
			</IonGrid>
		</BasicLayout>
	);
}
