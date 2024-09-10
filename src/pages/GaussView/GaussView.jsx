import GaussBell from '../../components/GaussBell/GaussBell';
import {IonButton, IonCol, IonGrid, IonIcon, IonLabel, IonRow} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import {useParams} from "react-router";
import {useLocation} from "react-router";
import {FileSharer} from "@byteowls/capacitor-filesharer";
import {shareSocial} from "ionicons/icons";

export default function GaussView() {
	const { takePhoto } = usePhotoGallery();
	const { search } = useLocation();
	const query = new URLSearchParams(search)
	const elementRef = useRef();

	const handleClick = async () => {
		const result = await downloadReceipt(elementRef, true, false, 'nombre', true);;
	};

	const downloadReceipt = async (elementRef, isMovil, isIos, nombre, isShare) => {
		const element = elementRef.current;
		const type = 'image/png';
		try {
			let canvas = await html2canvas(element);
			let dataUrl = canvas.toDataURL(type, 1.0);
			console.log(dataUrl);
			if (isShare) {

				let real64Data = dataUrl.split(",")[1];
				const nameForIos = 'comprobante-' + (new Date().getTime()).toString(16) + '.jpeg';
				try {
					await FileSharer.share({
						filename: nameForIos,
						contentType: "image/png",
						base64Data: real64Data,
					});
					return { status: true };
				} catch (error) {
					if (error.message === 'USER_CANCELLED') {
						return { status: false, url: 'cancel' };
					}
					console.error("File sharing failed", error.message);
				}
				return;
			}


		} catch (error) {
			console.error("Error generating receipt", error);
			return { status: false };
		}
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
					<div ref={elementRef} className="containerReceipt">
					<IonRow class='ion-justify-content-center' >
						<div style={{backgroundColor:'white',marginBottom: '2rem',marginTop:'1rem'}}>
						<IonLabel style={{fontWeight: 'bold',color:'black',padding:'1rem'}}>{result}</IonLabel>
						</div>
							<GaussBell
							z={z}
							xLimit={25}
							mean={mean}
							alpha1={alpha1}
							alpha2={alpha2}
						/>
					</IonRow>
					</div>
					<IonRow class='ion-justify-content-center' style={{marginTop:'1rem'}}>
						<IonButton onClick={handleClick}>
							Compartir
							<IonIcon
								icon={shareSocial}
								expand='block'
							/>
						</IonButton>
					</IonRow>

				</IonCol>
			</IonGrid>
		</BasicLayout>
	);
}
