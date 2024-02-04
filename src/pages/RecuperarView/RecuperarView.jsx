import {
	IonGrid,
	IonInput,
	IonRow,
	IonCol,
	IonRouterLink,
	IonButton,
} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import styles from './RecuperarView.module.css';

export default function RecuperarView() {
	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding ${styles.centered_menu}`}
			>
				<IonCol size={12} class='ion-justify-content-center'>
					<div className={styles.form_container}>
						<h1>¿Olvido su contraseña?</h1>
						<p>
							Ingresa tu correo electrónico y te enviaremos un
							enlace para recuperar tu contraseña.
						</p>
						<form onSubmit={(e) => e.preventDefault()}>
							<IonInput
								label='Correo electrónico'
								labelPlacement='floating'
								fill='outline'
								type='email'
								placeholder='Correo electrónico'
								required
							></IonInput>

							<IonButton expand='block' type='submit'>
								Recuperar Contraseña
							</IonButton>
						</form>
					</div>
				</IonCol>
			</IonGrid>
		</BasicLayout>
	);
}
