import {
	IonCol,
	IonGrid,
	IonIcon,
	IonItem,
	IonLabel,
	IonRow,
} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import MenuHeader from '../MenuView/MenuHeader/MenuHeader';
import { person } from 'ionicons/icons';

export default function AboutUsView() {
	return (
		<BasicLayout>
			<IonGrid class={`ion-text-center ion-no-padding`}>
				<IonRow class='ion-justify-content-center'>
					<MenuHeader title={'Sobre Nosostros'} />
				</IonRow>

				<IonRow>
					<IonCol size='12' gap={2}>
						<IonItem
							routerLink={'/about_us/1'}
							routerDirection='forward'
							target='_self'
							type='button'
							style={{
								'--min-height': '80px',
							}}
							className='ion-text-wrapd w-100'
						>
							<IonLabel className='ion-text-wrap'>
								<h3
									style={{
										fontSize: '1.5rem',
										letterSpacing: '1.5px',
									}}
								>
									Kevin Cardona
								</h3>
							</IonLabel>
							<IonIcon icon={person} slot='start' />
						</IonItem>
						<IonItem
							routerLink={'/about_us/2'}
							routerDirection='forward'
							target='_self'
							type='button'
							style={{
								'--min-height': '80px',
							}}
							className='ion-text-wrap w-100'
						>
							<IonLabel className='ion-text-wrap'>
								<h3
									style={{
										fontSize: '1.5rem',
										letterSpacing: '1.5px',
									}}
								>
									Juan Pablo Estrada
								</h3>
							</IonLabel>
							<IonIcon icon={person} slot='start' />
						</IonItem>
					</IonCol>
				</IonRow>
			</IonGrid>
		</BasicLayout>
	);
}
