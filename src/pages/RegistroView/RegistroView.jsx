import {
	IonGrid,
	IonInput,
	IonRow,
	IonCol,
	IonRouterLink,
	IonButton,
} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import styles from './RegistroView.module.css';

export default function RegistroView() {
	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding ${styles.centered_menu}`}
			>
				<IonCol size={12} class='ion-justify-content-center'>
					<div className={styles.form_container}>
						<h1>Nuevo Usuario</h1>
						<form onSubmit={(e) => e.preventDefault()}>
							<IonInput
								label='Nombre completo'
								labelPlacement='floating'
								fill='outline'
								type='email'
								placeholder='Nombre completo'
								required
							></IonInput>
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
							<IonInput
								label='Confirmar Contraseña'
								labelPlacement='floating'
								fill='outline'
								type='password'
								placeholder='Confirmar Contraseña'
								required
							></IonInput>
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
