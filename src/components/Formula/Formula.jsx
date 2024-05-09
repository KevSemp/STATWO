import { IonRow } from '@ionic/react';
import { MathJax } from 'better-react-mathjax';
import styles from './Formula.module.css';

export default function Formula({ formula, graphicRef }) {
	//console.log('formula', formula);
	return (
		<IonRow
			class='ion-justify-content-center'
			className={styles.fs_1}
			ref={graphicRef}
		>
			<MathJax inline>{`${formula}`}</MathJax>
		</IonRow>
	);
}
