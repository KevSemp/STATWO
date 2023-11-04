import { IonRow } from '@ionic/react';
import { MathJax } from 'better-react-mathjax';
import styles from './Formula.module.css';

export default function Formula({ formula }) {
	return (
		<IonRow class='ion-justify-content-center'>
			<MathJax>
				<span className={styles.fs_1}>{`${formula}`}</span>
			</MathJax>
		</IonRow>
	);
}
