import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

import { IonContent, IonPage } from '@ionic/react';
import { IonTabBar } from '@ionic/react';

export default function BasicLayout({ children }) {
	return (
		<>
			<Menu />
			<IonPage id='main-content'>
				<Header />
				<IonContent className='ion-padding'>{children}</IonContent>
				<IonTabBar slot='bottom'></IonTabBar>
			</IonPage>
		</>
	);
}
