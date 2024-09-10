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
import {
	handleLogin,
	handleGetUserInfo,
	handleLogout,
	createCollection,
	saveResult,
	handleDelete
} from "../../utils/firebase.js";
import styles from './DeleteAccount.module.css';
import { useIonLoading,useIonAlert } from '@ionic/react';
import {useHistory} from "react-router";

export default function DeleteAccount() {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [present, dismiss] = useIonLoading();
	const [presentAlert] = useIonAlert();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			loading();
			const response = await handleDelete(email,password);
			if(response){
				presentAlert({
					header: 'Success',
					cssClass: 'my-custom-class',
					message: 'Se ha eliminado cuenta correctamente.',
					buttons: ['OK'],
				})
			}
			dismiss();


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
						<h1>Eliminar Cuenta</h1>
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

							<IonButton expand='block' type='submit'>
								Eliminar
							</IonButton>

						</form>
					</div>
				</IonCol>
			</IonGrid>
		</BasicLayout>
	);
}
