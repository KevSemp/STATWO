import {
	IonCard,
	IonCardContent,
	IonCol,
	IonGrid,
	IonIcon,
	IonItem,
	IonLabel,
	IonRow,
} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import MenuHeader from '../MenuView/MenuHeader/MenuHeader';
import { useParams } from 'react-router';
import { formulario } from '../../data/formulario';
import { aboutUs } from '../../data/about_us';
import { useEffect, useState } from 'react';

export default function MoreInfoView({
	isFormula = false,
	isProfile = false,
	...props
}) {
	const { id } = useParams();
	const [data, setData] = useState({
		tema: '',
		descripcion: '',
	});

	useEffect(() => {
		if (isFormula) {
			const formula = formulario.find((f) => +f.id === +id);
			setData(formula);
		}
		if (isProfile) {
			const profile = aboutUs.find((p) => +p.id === +id);
			setData(profile);
		}
	});

	return (
		<BasicLayout>
			<IonGrid class={`ion-text-center ion-no-padding`}>
				<IonRow class='ion-justify-content-center'>
					<MenuHeader
						title={data?.tema ?? 'Más Información'}
						image={data?.image}
						isProfile={isProfile}
					/>
				</IonRow>
				{/* TODO: add a class to ion row to fill the hole line */}

				<IonRow>
					<IonCol size='12' gap={2}>
						<IonCard
							color='dark'
							style={{
								backgroundColor:
									'var(--ion-toolbar-background, var(--ion-background-color, #fff))',
								color: 'var(--ion-toolbar-color, var(--ion-text-color, #424242))',
							}}
						>
							<IonCardContent
								style={{
									textAlign: 'start',
									fontSize: '1rem',
								}}
							>
								{data.descripcion ?? 'No hay descripción'}
							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
			</IonGrid>
		</BasicLayout>
	);
}
