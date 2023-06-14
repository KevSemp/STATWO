import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
} from '@ionic/react';

export default function Header() {
	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot='start'>
					<IonMenuButton />
				</IonButtons>
				<IonTitle>Statwo</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
}
