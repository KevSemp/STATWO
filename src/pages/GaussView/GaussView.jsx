import GaussBell from '../../components/GaussBell/GaussBell';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default function GaussView() {
	const graphicRef = useRef(null);
	const handleClick = async () => {
		const canvas = await html2canvas(graphicRef.current);
		let imgData = canvas.toDataURL('image/png');
		let blob = await fetch(imgData).then((r) => r.blob());

		const fileName = `chart_${new Date().getTime()}.png`;
		const saveResult = await Filesystem.writeFile({
			path: fileName,
			data: blob,
			directory: Directory.ExternalStorage,
		});

		alert(
			`La imagen se ha guardado en la galería con el nombre ${fileName}`
		);
	};
	const z = 1.76;
	const alpha1 = -12.76;
	const alpha2 = 12.76;
	return (
		<BasicLayout>
			<IonGrid
				class={`ion-text-center ion-no-padding`}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
					width: '100%',
				}}
			>
				<IonCol>
					<IonRow class='ion-justify-content-center' ref={graphicRef}>
						<GaussBell
							z={z}
							alpha1={alpha1}
							alpha2={alpha2}
							xLimit={25}
						/>
					</IonRow>
					<IonRow class='ion-justify-content-center'>
						<IonButton onClick={handleClick}>Descargar</IonButton>
					</IonRow>
				</IonCol>
			</IonGrid>
		</BasicLayout>
	);
}
