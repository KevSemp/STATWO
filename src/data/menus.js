import MuestreoIcon from '../assets/icons/MuestreoIcon.svg';
import EstimacionIcon from '../assets/icons/EstimacionIcon.svg';
import HipotesisIcon from '../assets/icons/HipotesisIcon.svg';

export const PRIMARY_MENU = [
	{
		id: 1,
		title: 'Distribución Muestral',
		subtitle: 'Muestreo',
		path: '/muestreo',
		icon: MuestreoIcon,
		submenu: [],
	},
	{
		id: 2,
		title: 'Teoría de Estimación',
		subtitle: 'Estimación',
		path: '/estimacion',
		icon: EstimacionIcon,
		submenu: [],
	},
	{
		id: 3,
		title: 'Formulación de Hipótesis',
		subtitle: 'Hipótesis',
		path: '/hipotesis',
		icon: HipotesisIcon,
		submenu: [],
	},
];
