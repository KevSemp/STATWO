import { IonIcon, IonRow, IonButton } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

export default function GoBack({ route = '/' }) {
	const history = useHistory();
	const goBack = () => history.goBack();
	return (
		<IonRow>
			<IonButton onClick={goBack} fill='clear'>
				<IonIcon icon={chevronBackOutline} size='large' color='dark' />
			</IonButton>
		</IonRow>
	);
}
