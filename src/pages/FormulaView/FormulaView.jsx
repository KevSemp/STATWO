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
	IonText,
	isPlatform,
} from '@ionic/react';
import { evaluate } from 'mathjs';
import {
	chevronBackOutline,
	chevronForwardOutline,
	codeOutline,
	shareSocial,
} from 'ionicons/icons';
import { shareOptions } from '../../data/shareOptions';
import { ToastContainer, toast } from 'react-toastify';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';

import 'react-toastify/dist/ReactToastify.css';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import { Directory } from '@capacitor/filesystem';
import {useHistory} from "react-router";
import {chiCuadrado, searchCriticalValueZ, searchZValue,graphValues} from "../../utils/searchGraphicValues.js";
import { Camera } from '@capacitor/camera';
import { FileSharer } from '@byteowls/capacitor-filesharer';

export default function FormulaView({}) {
	const history = useHistory();
	const { id } = useParams();
	const [data, setData] = useState({});
	const [showResult, setShowResult] = useState(false);
	const [formulaText, setFormulaText] = useState('');
	const [formulaResult, setFormulaResult] = useState('');
	const [graphData, setGraphData] = useState({});
	const [result, setResult] = useState('');
	const [error, setError] = useState({
		show: false,
		message: '',
	});
	const modalRef = useRef();
	const dismiss = () => modalRef.current?.dismiss();

	const modalSignRef = useRef();
	const dismissSign = () => modalSignRef.current?.dismiss();

	const [showAlphaModal, setShowAlphaModal] = useState(false);

	const { takePhoto, getPhoto } = usePhotoGallery();
	const graphicRef = useRef(null);
	const saveImage = async () => {
		const canvas = await html2canvas(graphicRef.current);
		let dataUrl = canvas.toDataURL('image/jpeg');
		return takePhoto(dataUrl);
	};

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
	const handleGraph = () => {
		//graphValues(graphData);
		const {textResult} =  graphValues(graphData,id);
		console.log(graphData,id);
		history.push(`/gauss?m=${graphData.u}&x=${graphData.x}&res=${textResult}`)
		console.log(graphData);

	};
	const setSign = (sign) => {
		setGraphData((prevData) => ({
			...prevData,
			sign,
		}));
		dismissSign();
		if (formula?.selectSign2) setShowAlphaModal(true);
		else handleGraph();
	};
	const setAlpha = () => {
		setGraphData((prevData) => ({
			...prevData,
			alpha: data?.alpha,
		}));
		setShowAlphaModal(false);
		handleGraph();
	};
	const handleBack = () => {
		cleanText();
	};
	const handleRestart = () => {
		setData({});
		cleanText();
		setGraphData({});
	};
	const cleanText = () => {
		setShowResult(false);
		setFormulaText(formula?.formula);
		setFormulaResult('');
		setResult('');
		setError({
			show: false,
			message: '',
		});
	};
	const handleShare = async () => {
		const image_name = await saveImage();
		const image = await getPhoto(image_name.filepath);
		console.log(image);
		const base64Image = await FileSharer.share({
			filename: 'test.png',
			contentType: 'image/png',
			// If you want to save base64:
			base64Data: image,
			// If you want to save a file from a path:
			//path: "../../file.pdf",
		})
			.then(() => {
				// do sth
				console.log('entro');
			})
			.catch((error) => {
				console.error('File sharing failed', error.message);
			});
		/* if (isPlatform('hybrid')) {
			await Share.share({
				title: 'Compartir imagen',
				text: 'Mira esta imagen',
				url: base64Image,
				dialogTitle: 'Compartir imagen',
			});
		} else {
			await navigator.share({
				title: 'Compartir imagen',
				text: 'Mira esta imagen',
				url: base64Image,
			});
		} */
	};
	const invalidForm = () => {
		let message = '';
		const hasError = formula?.variables?.find((variable) => {
			if (variable?.invalid?.length > 0) {
				message =
					`${variable.simbolo}` +
					' no puede ser ' +
					variable.invalid.join(', ');
				//message = variable.invalid.join(', ');
			}
			return (
				variable.formulario &&
				(!data.hasOwnProperty(variable?.nombre) ||
					variable?.invalid?.includes(data[variable?.nombre]))
			);
		});
		/* if (hasError) {
			toast.error(<MathJax inline>{`${message}`}</MathJax>, {
				position: 'bottom-center',
				toastId: 'error',
				theme: 'colored',
			});
			return true;
		} */
		return false;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (invalidForm()) return;
		let operacion = formula.formula;
		let operacion2 = formula?.formula2 ?? null;
		let res = '';
		let variablesGrafica = [];
		if (formula?.hasGraph) {
			variablesGrafica = Object.fromEntries(
				[...formula.graphVariables].map((variable) => [
					variable,
					data[variable],
				])
			);
		}

		formula.variables
			.filter((variable) => variable?.clean_symbol)
			.forEach((variable) => {
				if (variable.formulario) {
					operacion = operacion.replace(
						variable.replace_symbol,
						data[variable.nombre]
					);
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
			if (formula?.hasGraph && variablesGrafica?.hasOwnProperty(res)) {
				variablesGrafica[res] = result;
			}
			result = `${res} = ${result.toFixed(4)}`;
		}
		if (formula?.hasGraph) {
			setGraphData(variablesGrafica);
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
			{showResult && formulaResult && (
				<Formula graphicRef={graphicRef} formula={formulaResult} />
			)}
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
							{/* <IonModal
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
												onClick={handleShareData}
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
							</IonModal> */}
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
							{formula?.hasGraph && (
								<>
									<IonButton
										onClick={handleGraph}
										shape='round'
										size='small'
										id={
											formula?.selectSign
												? 'open-modal-sign'
												: ''
										}
									>
										Gráficar
									</IonButton>
									{formula?.selectSign && (
										<IonModal
											ref={modalSignRef}
											trigger='open-modal-sign'
											initialBreakpoint={0.25}
											breakpoints={[0, 0.25]}
										>
											<IonContent className='ion-padding ion-text-center'>
												<IonRow
													class='ion-text-center'
													style={{
														justifyContent:
															'center',
													}}
												>
													<h2>Seleccione:</h2>
												</IonRow>
												<div
													style={{
														display: 'flex',
														flexDirection: 'row',
														flexWrap: 'wrap',
														gap: '1rem',
														marginTop: '1rem',
														justifyContent:
															'space-evenly',
														alignItems: 'center',
													}}
												>
													<IonButton
														shape='round'
														size={'large'}
														fill='clear'
														color={'dark'}
														className='share-button'
														style={{
															display: 'flex',
															flexDirection:
																'column',
															alignItems:
																'center',
															justifyContent:
																'center',
															gap: '0.5rem',
														}}
														onClick={() =>
															setSign('<')
														}
													>
														<IonIcon
															icon={
																chevronBackOutline
															}
														/>
														{/* <span>Menor que</span> */}
													</IonButton>
													{formula?.selectSign2 && (
														<IonButton
															shape='round'
															size={'large'}
															fill='clear'
															color={'dark'}
															className='share-button'
															style={{
																display: 'flex',
																flexDirection:
																	'column',
																alignItems:
																	'center',
																justifyContent:
																	'center',
																gap: '0.5rem',
															}}
															onClick={() =>
																setSign('!=')
															}
														>
															<IonIcon
																icon={
																	codeOutline
																}
															/>
															{/* <span>Distinto</span> */}
														</IonButton>
													)}
													<IonButton
														shape='round'
														size={'large'}
														fill='clear'
														color={'dark'}
														className='share-button'
														style={{
															display: 'flex',
															flexDirection:
																'column',
															alignItems:
																'center',
															justifyContent:
																'center',
															gap: '0.5rem',
														}}
														onClick={() =>
															setSign('>')
														}
													>
														<IonIcon
															icon={
																chevronForwardOutline
															}
														/>
														{/* <span>Mayor que</span> */}
													</IonButton>
												</div>
												<div className='s-formula-result-buttons'>
													<IonButton
														onClick={() => {
															dismissSign();
														}}
														shape='round'
														size='small'
													>
														Cancelar
													</IonButton>
												</div>
											</IonContent>
										</IonModal>
									)}
									{formula?.selectSign2 && (
										<IonModal
											isOpen={showAlphaModal}
											initialBreakpoint={0.25}
											breakpoints={[0, 0.25]}
										>
											<IonContent className='ion-padding ion-text-center'>
												<IonRow
													class='ion-text-center'
													style={{
														justifyContent:
															'center',
													}}
												>
													<h2>
														Ingrese el valor de{' '}
														<MathJax inline>
															{`\\(\\alpha\\)`}
														</MathJax>
														:
													</h2>
												</IonRow>
												<IonRow>
													<IonInput
														name='alpha'
														type='number'
														value={data.alpha}
														onIonChange={
															handleChange
														}
														required
													></IonInput>
												</IonRow>
												<div className='s-formula-result-buttons'>
													<IonButton
														onClick={() => {
															setShowAlphaModal(
																false
															);
														}}
														shape='round'
														size='small'
													>
														Cancelar
													</IonButton>
													<IonButton
														onClick={setAlpha}
														shape='round'
														size='small'
													>
														Continuar
													</IonButton>
												</div>
											</IonContent>
										</IonModal>
									)}
								</>
							)}
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
			<ToastContainer
				style={{
					bottom: 'calc(env(safe-area-inset-bottom) + 56px)',
				}}
			/>
		</BasicLayout>
	);
}
