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
		submenu: [
			{
				id: '1.1',
				title: 'Distribuciones muestrales para medias',
				subtitle: 'Medias',
				path: '/formula/1',
			},
			{
				id: '1.2',
				title: 'Distribución muestral para varianzas',
				subtitle: 'Varianzas',
				path: '/formula/2',
			},
			{
				id: '1.3',
				title: 'Distribución muestral para proporciones',
				subtitle: 'Proporciones',
				path: '/formula/3',
			},
		],
	},
	{
		id: 2,
		title: 'Teoría de Estimación',
		subtitle: 'Estimación',
		path: '/estimacion',
		icon: EstimacionIcon,
		submenu: [
			{
				id: '2.1',
				title: 'Intervalos de confianza para proporciones',
				subtitle: 'Intervalos de confianza para proporciones',
				path: '/formula/4',
			},
			{
				id: '2.2',
				title: 'Intervalos de confianza para medias',
				subtitle: 'Intervalos de confianza para medias',
				path: '/formula/5',
			},
		],
	},
	{
		id: 3,
		title: 'Formulación de Hipótesis',
		subtitle: 'Hipótesis',
		path: '/hipotesis',
		icon: HipotesisIcon,
		submenu: [
			{
				id: '3.1',
				title: 'Pruebas de hipótesis para medias 1 población',
				subtitle: 'Medias 1 población',
				path: '/formula/6',
			},
			{
				id: '3.2',
				title: 'Pruebas de hipótesis para proporciones 1 población',
				subtitle: 'Proporciones 1 población',
				path: '/formula/7',
			},
			{
				id: '3.3',
				title: 'Hipótesis para varianzas 1 población',
				subtitle: 'Varianzas 1 población',
				path: '/formula/8',
			},
			{
				id: '3.4',
				title: 'Pruebas de hipótesis para medias 2 poblaciones',
				subtitle: 'Medias 2 poblaciones',
				path: '/formula/9',
			},
			/* {
				id: '3.5',
				title: 'Hipótesis para varianzas 2 poblaciones',
				subtitle: 'Varianzas 2 poblaciones',
				path: '/formula/10',
			},
			{
				id: '3.6',
				title: 'Pruebas de hipótesis para proporciones 2 poblaciones',
				subtitle: 'Proporciones 2 poblaciones',
				path: '/formula/11',
			},
			{
				id: '3.7',
				title: 'Pruebas especiales de Chi-Cuadrado',
				subtitle: 'Chi-Cuadrado',
				path: '/formula/12',
			}, */
		],
	},
];
