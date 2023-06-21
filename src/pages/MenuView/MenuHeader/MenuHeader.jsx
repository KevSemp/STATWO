import { IonIcon, IonImg, IonRouterLink, IonRow, IonText } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

export default function MenuHeader({ title, image }) {
	return (
		<header>
			<IonRow>
				<IonRouterLink routerLink='/'>
					<IonIcon
						icon={chevronBackOutline}
						size='large'
						color='dark'
					/>
				</IonRouterLink>
			</IonRow>
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
