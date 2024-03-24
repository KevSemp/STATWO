import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { formulario } from '../../data/formulario';
import FormulaHeader from '../../components/FormulaHeader/FormulaHeader';
import { MathJax } from 'better-react-mathjax';
import Formula from '../../components/Formula/Formula';
import {
	IonButton,
	IonCol,
	IonContent,
	IonIcon,
	IonInput,
	IonModal,
	IonRow,
} from '@ionic/react';
import { evaluate } from 'mathjs';
import { shareSocial } from 'ionicons/icons';
import { shareOptions } from '../../data/shareOptions';

export default function FormulaView() {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [showResult, setShowResult] = useState(false);
	const [formulaText, setFormulaText] = useState('');
	const [formulaResult, setFormulaResult] = useState('');
	const [result, setResult] = useState('');
	const modalRef = useRef();
	const dismiss = () => modalRef.current?.dismiss();

	const formula = useMemo(() => formulario.find((f) => +f.id === +id), [id]);

	useEffect(() => {
		setFormulaText(formula?.formula);
		return () => {
			setFormulaText('');
		};
	}, [formula]);

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: +e.detail.value,
		});
	};
	const handleBack = () => {
		cleanText();
	};
	const handleRestart = () => {
		setData({});
		cleanText();
	};
	const cleanText = () => {
		setShowResult(false);
		setFormulaText(formula?.formula);
		setFormulaResult('');
		setResult('');
	};
	const handleShare = () => {
		const modal = document.getElementById('modal-share');
		modal.classList.add('show-modal');
	};
	const invalidForm = () =>
		formula?.variables?.find(
			(variable) =>
				variable.formulario &&
				(!data.hasOwnProperty(variable?.nombre) ||
					variable?.invalid?.includes(data[variable?.nombre]))
		);
	const handleSubmit = (e) => {
		e.preventDefault();
		//TODO: ver donde mostrar el error para el usuario
		//console.log(data);
		if (invalidForm()) return;
		let operacion = formula.formula;
		let operacion2 = formula?.formula2 ?? null;
		let res = '';
		formula.variables
			.filter((variable) => variable?.clean_symbol)
			.forEach((variable) => {
				if (variable.formulario) {
					operacion = operacion.replace(
						variable.replace_symbol,
						data[variable.nombre]
					);
					//console.log(operacion);
					if (operacion2)
						operacion2 = operacion2.replaceAll(
							variable.nombre,
							data[variable.nombre]
						);
				} else {
					res = variable.replace_symbol;
					operacion = operacion.replace(`\\(${res}`, '');
				}
			});

		const desigualdad = operacion.includes('\\pm');
		!desigualdad && setFormulaResult(`\\(${res} ${operacion}`);
		//Replace \\frac{$}{$} with ($)/($)
		if (!operacion2)
			operacion = operacion
				.replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)') // fractions
				.replace(/\\sqrt{([^}]+)}/g, 'sqrt($1)') // square roots
				.replace('=', '') // remove =
				.replace(':', '') // remove =
				.replace(/\s+/g, '');
		// remove spaces
		else operacion = operacion2.replace('=', '').replace(':', '');
		//console.log(operacion);
		let result;
		if (desigualdad) {
			const min = evaluate(operacion.replace(/\\pm/g, '-'));
			const max = evaluate(operacion.replace(/\\pm/g, '+'));

			result = `${parseFloat(min).toFixed(4)} ≤ ${res} ≤ ${parseFloat(
				max
			).toFixed(4)}`;
			setFormulaResult(`\\(${res} : ${operacion}\\)`);
		} else {
			result = evaluate(operacion);
			result = `${res} = ${result.toFixed(4)}`;
		}
		setResult(result);
		//addResult(result);
		setShowResult(true);
	};
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
			{!showResult && formulaText && <Formula formula={formulaText} />}
			{!showResult && (
				<form
					onSubmit={handleSubmit}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '1rem',
						gap: '1rem',
						width: '100%',
					}}
				>
					{formula?.variables.map((variable, index) => {
						//console.log(variable.simbolo);
						return (
							variable.formulario && (
								<div
									key={index}
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '1rem',
										width: '100%',
									}}
								>
									<MathJax
										inline
									>{`${variable.simbolo}`}</MathJax>
									=
									<IonInput
										name={variable.nombre}
										type={variable.tipo}
										value={data[variable?.nombre]}
										onIonChange={handleChange}
										required
									></IonInput>
								</div>
							)
						);
					})}
					<IonButton expand='block' type='submit'>
						Calcular
					</IonButton>
				</form>
			)}
			{showResult && formulaResult && <Formula formula={formulaResult} />}
			{showResult && (
				<IonRow
					class='ion-text-center'
					style={{
						marginTop: '1.5rem',
					}}
				>
					<IonCol
						size={12}
						gap={3}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '1rem',
						}}
					>
						<h2>
							Resultado
							<IonIcon
								icon={shareSocial}
								onClick={handleShare}
								id='open-modal-share'
								expand='block'
							/>
							<IonModal
								ref={modalRef}
								trigger='open-modal-share'
								initialBreakpoint={0.25}
								breakpoints={[0, 0.25]}
							>
								<IonContent className='ion-padding ion-text-center'>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											flexWrap: 'wrap',
											gap: '1rem',
											marginTop: '1rem',
											justifyContent: 'space-evenly',
											alignItems: 'center',
										}}
									>
										{shareOptions.map((option) => (
											<IonButton
												key={option.id}
												shape='round'
												size={'large'}
												fill='clear'
												color={'dark'}
												className='share-button'
												style={{
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
													justifyContent: 'center',
													gap: '0.5rem',
												}}
											>
												<IonIcon icon={option.icon} />
												<span>{option.title}</span>
											</IonButton>
										))}
									</div>
									<div className='s-formula-result-buttons'>
										<IonButton
											onClick={() => {
												dismiss();
											}}
											shape='round'
											size='small'
										>
											Cancelar
										</IonButton>
									</div>
								</IonContent>
							</IonModal>
							{/* <IonModal
								modalRef={modalRef}
								dismiss={dismiss}
								id='modal-share'
								trigger='open-modal-share'
								title='Compartir por:'
							>
								<Share dismiss={dismiss} />
							</IonModal> */}
						</h2>
						<MathJax inline>{`${result}`}</MathJax>
						<div
							style={{
								marginTop: '1rem',
							}}
						>
							<IonButton
								onClick={handleBack}
								shape='round'
								size='small'
							>
								Editar
							</IonButton>
							<IonButton
								onClick={handleRestart}
								shape='round'
								size='small'
							>
								Limpiar
							</IonButton>
						</div>
					</IonCol>
				</IonRow>
			)}
		</BasicLayout>
	);
}
