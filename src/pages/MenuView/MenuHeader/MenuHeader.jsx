import { IonAvatar, IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
//import GoBack from '../../../components/GoBack/GoBack';

export default function MenuHeader({ title, image = null, isProfile = false }) {
	return (
		<header>
			{/* <GoBack route='/' /> */}
			{image && (
				<IonRow className='ion-justify-content-center'>
					{!isProfile && (
						<IonImg src={image} alt={title} loading='lazy' />
					)}
					{isProfile && (
						<IonAvatar
							style={{
								width: '150px',
								height: '150px',
							}}
						>
							<img src={image} />
						</IonAvatar>
					)}
				</IonRow>
			)}
			<IonRow className='ion-justify-content-center'>
				<IonText color='dark'>
					<h1>{title}</h1>
				</IonText>
			</IonRow>
		</header>
	);
}
