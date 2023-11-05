import {
	IonMenu,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonIcon,
	IonLabel,
	IonNote,
} from '@ionic/react';
import { listCircle } from 'ionicons/icons';
import { PRIMARY_MENU } from '../../data/menus';

export default function Menu() {
	return (
		<IonMenu contentId='main-content' menuId='main-options-content'>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Statwo</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList inset={false}>
					{PRIMARY_MENU.map((menu_item) => (
						<IonItem button={true} href={menu_item.path}>
							{/* <IonIcon
								color='danger'
								slot='start'
								icon={listCircle}
								size='large'
							></IonIcon> */}
							<IonLabel>{menu_item.title}</IonLabel>
							{/* {menu_item?.submenu?.length > 0 && (
								<IonNote slot='end'>
									{menu_item?.submenu?.length}
								</IonNote>
							)} */}
						</IonItem>
					))}
					<IonItem button={true} href='/about_us'>
						<IonLabel>Sobre Nosotros</IonLabel>
					</IonItem>
					{false && (
						<IonItem button={true} href='/perfil'>
							<IonLabel>Perfil</IonLabel>
						</IonItem>
					)}
					{true ? (
						<IonItem button={true} href='/login'>
							<IonLabel>Iniciar Sesión</IonLabel>
						</IonItem>
					) : (
						<IonItem button={true} href='/logout'>
							<IonLabel>Cerrar Sesión</IonLabel>
						</IonItem>
					)}
				</IonList>
			</IonContent>
		</IonMenu>
	);
}
