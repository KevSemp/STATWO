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
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {handleLogout} from "../../utils/firebase.js";
import {useHistory} from "react-router";
export default function Menu() {
	const [isLogOut, setIsLogOut] = useState(true);
	const history = useHistory();
	const signOut = async () => {
		await handleLogout();
		history.push('/');
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
			if (currentUser) {
				console.log(currentUser)
				// El usuario está autenticado
				console.log(true);
				setIsLogOut(false)
			} else {
				// No hay usuario autenticado
				setIsLogOut(true)
			}
		});

		// Se ejecuta al desmontar el componente para limpiar el listener
		return () => unsubscribe();
	}, []);
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
						<IonItem
							button={true}
							href={menu_item.path}
							key={menu_item.id}
						>
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
					{isLogOut ? (
						<></>
					) : (
						<IonItem button={true} href='/perfil'>
							<IonLabel>Perfil</IonLabel>
						</IonItem>
					)}


					{isLogOut ? (
						<IonItem button={true} href='/login'>
							<IonLabel>Iniciar Sesión</IonLabel>
						</IonItem>
					) : (
						<IonItem button={true}  onClick={() => {
							signOut();
						}}>
							<IonLabel>Cerrar Sesión</IonLabel>
						</IonItem>
					)}
					<IonItem button={true} href='/gauss'>
						<IonLabel>GaussTest</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonMenu>
	);
}
