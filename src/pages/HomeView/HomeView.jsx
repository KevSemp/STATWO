import React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import Card from '../../components/Card/Card';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { PRIMARY_MENU } from '../../data/menus';
import styles from './HomeView.module.css';

export default function HomeView() {
	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding ${styles.centered_menu}`}
			>
				<IonRow
					class={`ion-justify-content-center ${styles.gapped_card}`}
				>
					{PRIMARY_MENU.map((item) => (
						<Card
							key={item.id}
							title={item.subtitle}
							alt={item.title}
							image={item.icon}
							href={item.path}
						/>
					))}
				</IonRow>
			</IonGrid>
		</BasicLayout>
	);
}
