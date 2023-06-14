import {
	IonMenu,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
} from '@ionic/react';

export default function Menu() {
	return (
		<IonMenu contentId='main-content'>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Statwo</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className='ion-padding'>
				This is the menu content.
			</IonContent>
		</IonMenu>
	);
}
