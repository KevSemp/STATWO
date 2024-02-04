import {
	IonGrid,
	IonInput,
	IonRow,
	IonCol,
	IonRouterLink,
	IonButton,
} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import styles from './LoginView.module.css';

export default function LoginView() {
	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding ${styles.centered_menu}`}
			>
				<IonCol size={12} class='ion-justify-content-center'>
					<div className={styles.form_container}>
						<h1>Iniciar Sesión</h1>
						<form onSubmit={(e) => e.preventDefault()}>
							<IonInput
								label='Correo electrónico'
								labelPlacement='floating'
								fill='outline'
								type='email'
								placeholder='Correo electrónico'
								required
							></IonInput>
							<IonInput
								label='Contraseña'
								labelPlacement='floating'
								fill='outline'
								type='password'
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
