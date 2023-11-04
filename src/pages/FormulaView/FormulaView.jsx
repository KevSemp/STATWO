import { useMemo } from 'react';
import { useParams } from 'react-router';
import GoBack from '../../components/GoBack/GoBack';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { formulario } from '../../data/formulario';
import FormulaHeader from '../../components/FormulaHeader/FormulaHeader';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Formula from '../../components/Formula/Formula';
import { IonInput } from '@ionic/react';

export default function FormulaView() {
	const { id } = useParams();
	const formula = useMemo(() => formulario.find((f) => +f.id === +id), [id]);
	return (
		<BasicLayout>
			{/* <GoBack /> */}
			{!formula && (
				<h1 className='ion-text-center'>No se encontró la fórmula</h1>
			)}
			<FormulaHeader
				title={formula?.titulo}
				topic={formula?.tema}
				formulaID={formula.id}
			/>
			<Formula formula={formula?.formula} />
			<form onSubmit={(e) => e.preventDefault()}>
				{formula?.variables.map(
					(variable, index) =>
						variable.formulario && (
							<IonInput
								key={index}
								name={variable.nombre}
								type={variable.tipo}
								required
								label={
									<MathJax>{`${variable.simbolo} = `}</MathJax>
								}
							></IonInput>
						)
				)}
				{/* <IonItem
												key={index}
												style={{ border: 'none' }}>
												<IonLabel>
													<MathJax.Node
														formula={`${variable.simbolo} = `}
													/>
												</IonLabel>
												<IonInput
													name={variable.nombre}
													type={variable.tipo}
													required
													value={
														data[variable.nombre]
													}
													onIonChange={
														handleChange
													}></IonInput>
											</IonItem> */}
			</form>
		</BasicLayout>
	);
}
