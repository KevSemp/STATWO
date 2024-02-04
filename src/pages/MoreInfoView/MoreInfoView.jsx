import {
	IonCard,
	IonCardContent,
	IonCol,
	IonGrid,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonRow,
} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import MenuHeader from '../MenuView/MenuHeader/MenuHeader';
import { useParams } from 'react-router';
import { formulario } from '../../data/formulario';
import { aboutUs } from '../../data/about_us';
import { useEffect, useState } from 'react';
import { MathJax } from 'better-react-mathjax';

export default function MoreInfoView({
	isFormula = false,
	isProfile = false,
	isVariables = false,
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
		if (isVariables) {
			const variable = formulario.find((v) => +v.id === +id);
			setData(variable);
		}
	}, [id, isFormula, isProfile, isVariables]);

	return (
		<BasicLayout>
			<IonGrid class={`ion-text-center ion-no-padding`}>
				<IonRow class='ion-justify-content-center ion-margin-bottom'>
					<MenuHeader
						title={data?.tema ?? 'Más Información'}
						image={data?.image}
						isProfile={isProfile}
					/>
				</IonRow>
				<IonRow>
					<IonCol size='12' gap={2}>
						{(isFormula || isProfile) && (
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
						)}
						{isVariables && (
							<IonList>
								{data.variables?.map((v) => (
									<IonItem key={v.id}>
										<IonLabel>
											<MathJax inline>
												{`${v.simbolo} = `}
											</MathJax>
											{v.descripcion}
										</IonLabel>
									</IonItem>
								))}
							</IonList>
						)}
					</IonCol>
				</IonRow>
			</IonGrid>
		</BasicLayout>
	);
}
