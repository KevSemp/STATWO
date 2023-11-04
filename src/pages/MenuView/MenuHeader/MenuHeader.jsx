import { IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
import GoBack from '../../../components/GoBack/GoBack';

export default function MenuHeader({ title, image }) {
	return (
		<header>
			{/* <GoBack route='/' /> */}
			<IonRow className='ion-justify-content-center'>
				<IonImg src={image} alt={title} loading='lazy' />
			</IonRow>
			<IonRow className='ion-justify-content-center'>
				<IonText color='dark'>
					<h1>{title}</h1>
				</IonText>
			</IonRow>
		</header>
	);
}
