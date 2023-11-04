import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	IonBackButton,
	IonRouterLink,
} from '@ionic/react';

export default function Header() {
	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot='start'>
					<IonMenuButton />
					<IonBackButton />
				</IonButtons>
				<IonRouterLink routerDirection='root' href='/' color='dark'>
					<IonTitle>Statwo</IonTitle>
				</IonRouterLink>
			</IonToolbar>
		</IonHeader>
	);
}
