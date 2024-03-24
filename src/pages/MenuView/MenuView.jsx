import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import MenuHeader from './MenuHeader/MenuHeader';
import { chevronForwardOutline } from 'ionicons/icons';

export default function MenuView({ menu, title, image }) {
	return (
		<BasicLayout>
			<MenuHeader title={title} image={image} />
			<section>
				{menu.map((item) => (
					<IonItem
						key={item.id}
						routerLink={item.path}
						routerDirection='forward'
						target='_self'
						type='button'
						style={{
							'--min-height': '80px',
						}}
						className='ion-text-wrap ion-text-center'
					>
						<IonLabel className='ion-text-wrap ion-text-center'>
							<h3
								style={{
									fontSize: '1.3rem',
									letterSpacing: '1.5px',
								}}
							>
								{item.subtitle}
							</h3>
						</IonLabel>
						<IonIcon icon={chevronForwardOutline} slot='end' />
					</IonItem>
				))}
			</section>
		</BasicLayout>
	);
}
