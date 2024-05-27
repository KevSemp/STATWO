import GaussBell from '../../components/GaussBell/GaussBell';
import {IonButton, IonCol, IonGrid, IonLabel, IonRow} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import {useParams} from "react-router";
import {useLocation} from "react-router";

export default function GaussView() {
	const { takePhoto } = usePhotoGallery();
	const { search } = useLocation();
	const query = new URLSearchParams(search)
	console.log(query.get('res'));
	const graphicRef = useRef(null);
	const handleClick = async () => {
		const canvas = await html2canvas(graphicRef.current);
		let dataUrl = canvas.toDataURL('image/png');
		takePhoto(dataUrl);
	};
	const mean = +query.get('m');
	const z = query.get('z') === null ? null : +query.get('z');
	const alpha1 =query.get('x') === null ? null :  +query.get('x');
	const alpha2 = query.get('y') === null ? null :  +query.get('y');
	const result = query.get('res');
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
						<IonLabel style={{marginBottom: '2rem',fontWeight: 'bold'}}>{result}</IonLabel>
						<GaussBell
							z={z}
							xLimit={25}
							mean={mean}
							alpha1={alpha1}
							alpha2={alpha2}
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
