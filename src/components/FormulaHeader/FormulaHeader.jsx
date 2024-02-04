import { IonIcon, IonRouterLink, IonRow, IonText } from '@ionic/react';
import { help } from 'ionicons/icons';
import styles from './FormulaHeader.module.css';

export default function FormulaHeader({ title, topic, formulaID }) {
	return (
		<header>
			<IonRow
				className={`${styles.container} ion-justify-content-center ion-align-items-center`}
			>
				<IonText color='dark'>
					<h1 className={styles.title}>{topic}</h1>
					<IonRouterLink
						routerDirection='forward'
						href={`/help/${formulaID}/info`}
					>
						<IonIcon
							icon={help}
							className={`${styles.helpButton} ion-no-margin ion-no-padding`}
							color='primary'
						></IonIcon>
					</IonRouterLink>
				</IonText>
			</IonRow>
			<IonRow
				className={`${styles.container} ion-justify-content-center ion-align-items-center`}
			>
				<IonText color='dark'>
					<h2 className={styles.subtitle}>{title}</h2>
					<IonRouterLink
						routerDirection='forward'
						href={`/help/${formulaID}/formula`}
					>
						<IonIcon
							icon={help}
							className={`${styles.helpButton} ion-no-margin ion-no-padding`}
							color='primary'
						/>
					</IonRouterLink>
				</IonText>
			</IonRow>
		</header>
	);
}
