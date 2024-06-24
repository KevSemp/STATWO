import { IonGrid, IonRow } from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import MenuHeader from '../MenuView/MenuHeader/MenuHeader';

export default function PrivacyView() {
	return (
		<BasicLayout>
			<IonGrid class={`ion-text-center ion-no-padding`}>
				<IonRow class='ion-justify-content-center'>
					<MenuHeader title={'Política de Privacidad'} />
				</IonRow>

				<IonRow
					class='ion-text-justify'
					style={{ display: 'flex', flexDirection: 'column' }}
				>
					<p>
						De acuerdo con las regulaciones de protección de datos,
						STATWO desea proporcionarte una política de privacidad
						clara y transparente para la aplicación STATWO, que está
						relacionada con tu tesis universitaria. A continuación,
						se detallan los aspectos clave de nuestra política de
						privacidad:
					</p>
					<ol>
						<li>
							<p>Recopilación de Datos Personales:</p>
							<ul>
								<li>
									<b>Finalidad:</b>Recolectamos datos
									personales con el objetivo de brindarte una
									experiencia personalizada en la aplicación y
									garantizar su funcionamiento adecuado.
								</li>

								<li>
									<b>Tipo de Datos:</b>Los datos recopilados
									pueden incluir información como nombre,
									dirección de correo electrónico,
									preferencias de usuario y datos de uso.
								</li>
								<li>
									<b>Consentimiento:</b>Al utilizar la
									aplicación, aceptas proporcionar estos datos
									voluntariamente.
								</li>
							</ul>
						</li>
						<li>
							<p>Responsable del Tratamiento:</p>
							<ul>
								<li>
									<b>Nombre: </b> STATWO
								</li>
								<li>
									<b>Datos de Contacto: </b> Puedes
									comunicarte con nosotros a través de correo
									electrónico o nuestro sitio web.
								</li>
							</ul>
						</li>
						<li>
							<p>Legitimación para el Tratamiento de Datos:</p>
							<ul>
								<li>
									La base legal para el procesamiento de tus
									datos personales es tu consentimiento
									expreso al utilizar la aplicación.
								</li>
							</ul>
						</li>
						<li>
							<p>Destinatarios de los Datos:</p>
							<ul>
								<li>
									Los datos recopilados se utilizan
									exclusivamente dentro de la aplicación y no
									se comparten con terceros sin tu
									consentimiento previo.
								</li>
							</ul>
						</li>
						<li>
							<p>Periodo de Conservación de Datos:</p>
							<ul>
								<li>
									Mantendremos tus datos personales durante el
									tiempo necesario para cumplir con los fines
									establecidos y según lo exija la ley
									aplicable.
								</li>
							</ul>
						</li>
						<li>
							<p>Derechos del Usuario:</p>
							<ul>
								<li>
									Tienes derecho a acceder, rectificar,
									suprimir, limitar el tratamiento y portar
									tus datos personales. Puedes ejercer estos
									derechos enviándonos un correo electrónico o
									utilizando los enlaces proporcionados en la
									aplicación.
								</li>
							</ul>
						</li>
						<li>
							<p>Geolocalización y Datos de Menores:</p>
							<ul>
								<li>
									Si la aplicación utiliza servicios de
									geolocalización, se te informará y se
									solicitará tu consentimiento específico.
								</li>
								<li>
									Si la aplicación está dirigida a menores, se
									aplicarán medidas adicionales para proteger
									su privacidad.
								</li>
							</ul>
						</li>
					</ol>
				</IonRow>
			</IonGrid>
		</BasicLayout>
	);
}
