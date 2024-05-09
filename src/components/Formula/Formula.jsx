import { IonRow } from '@ionic/react';
import { MathJax } from 'better-react-mathjax';
import styles from './Formula.module.css';

export default function Formula({ formula }) {
	//console.log('formula', formula);
	return (
		<IonRow class='ion-justify-content-center' className={styles.fs_1}>
			<MathJax inline>{`${formula}`}</MathJax>
		</IonRow>
	);
}
