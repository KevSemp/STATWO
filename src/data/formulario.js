export const formulario = [
	{
		id: 1,
		formula: '\\(z = \\frac{\\bar{x} - \\mu}{\\sigma_{\\bar{x}}}\\)',
		formula2: '(x - u)/sigma',
		variables: [
			{
				nombre: 'z',
				descripcion: 'Teorema de límite central',
				tipo: 'number',
				simbolo: '\\(z\\)',
				formulario: false,
			},
			{
				nombre: 'x',
				descripcion: 'Media muestral',
				tipo: 'number',
				simbolo: '\\(\\bar{x}\\)',
				formulario: true,
			},
			{
				nombre: 'u',
				descripcion: 'Media de poblacional',
				tipo: 'number',
				simbolo: '\\(\\mu\\)',
				formulario: true,
			},
			{
				nombre: 'sigma',
				descripcion: 'Error estándar de la muestra. (Incertidumbre)',
				tipo: 'number',
				simbolo: '\\(\\sigma_{\\bar{x}}\\)',
				formulario: true,
				invalid: [0],
			},
		],
		descripcion:
			'Puede definirse como aquellos métodos que hacen posible la estimación de una característica de una población o la toma de una decisión referente a una población, basándose sólo en los resultados de una muestra.',
		tema: 'Distribución Muestral para Medias',
		titulo: 'Distribución Normal',
		subtema: ['medias'],
	},
	{
		id: 2,
		formula: '\\(X^2 = \\frac{(n - 1) * S^2}{\\sigma^2}\\)',
		formula2: '((n_val - 1) * S)/(sigma)',
		variables: [
			{
				nombre: 'X',
				descripcion: 'Distribución Chi-cuadrado',
				tipo: 'number',
				simbolo: '\\(X^2\\)',
				formulario: false,
			},
			{
				nombre: 'n_val',
				descripcion: 'Tamaño de la muestra',
				tipo: 'number',
				simbolo: '\\(n\\)',
				formulario: true,
			},
			{
				nombre: 'S',
				descripcion: 'Varianza muestral',
				tipo: 'number',
				simbolo: '\\(S^2\\)',
				formulario: true,
			},
			{
				nombre: 'sigma',
				descripcion: 'Varianza de la población',
				tipo: 'number',
				simbolo: '\\(\\sigma^2\\)',
				formulario: true,
				invalid: [0],
			},
		],
		descripcion:
			'Calcula la probabilidad de una varianza en la muestra al conocer el valor de la varianza poblacional. Para su cálculo se utiliza la distribución chi-cuadrado.',
		tema: 'Distribución Muestral para Medias',
		titulo: 'Distribución Normal',
		subtema: ['varianzas'],
	},
	{
		id: 3,
		formula: '\\(Z = \\frac{\\bar{p} - P}{\\sigma_{\\bar{p}}}\\)',
		formula2: '(p_prom - P)/sigma',
		variables: [
			{
				nombre: 'Z',
				descripcion: 'Teorema de límite central',
				tipo: 'number',
				simbolo: '\\(Z\\)',
				formulario: false,
			},
			{
				nombre: 'p_prom',
				descripcion: 'Proporción muestral',
				tipo: 'number',
				simbolo: '\\(\\bar{p}\\)',
				formulario: true,
			},
			{
				nombre: 'P',
				descripcion: 'Proporción poblacional',
				tipo: 'number',
				simbolo: '\\(P\\)',
				formulario: true,
			},
			{
				nombre: 'sigma',
				descripcion:
					'Error estándar de la proporción. (Desviación estándar de la distribución muestral de proporciones)',
				tipo: 'number',
				simbolo: '\\(\\sigma_{\\bar{p}}\\)',
				formulario: true,
				invalid: [0],
			},
		],
		descripcion:
			'Mide la probabilidad de una proporción exitosa en la muestra al conocer la proporción exitosa de la población. La única restricción para utilizarla es que cumpla con la condición: np ≥ 5 y nq ≥ 5',
		tema: 'Distribución Muestral de la Proporción',
		titulo: 'Distribución Normal',
		subtema: ['varianzas'],
	},
	{
		id: 4,
		formula:
			'P : \\bar{p} \\pm \\sqrt{\\frac{z_{\\frac{\\alpha}{2}} * (1 - \\bar{p})}{n}}',
		formula2: 'p_prom \\pm sqrt((z_val * (1 - p_prom))/(n_val))',
		variables: [
			{
				nombre: 'alfa',
				descripcion: 'Probabilidad de error',
				tipo: 'number',
				simbolo: '\\(\\alpha\\)',
				formulario: false,
			},
			{
				nombre: 'p_prom',
				descripcion: 'Proporción muestral',
				tipo: 'number',
				simbolo: '\\(\\bar{p}\\)',
				formulario: false,
			},
			{
				nombre: 'P',
				descripcion: 'Intervalo de confianza',
				tipo: 'number',
				simbolo: '\\(P\\)',
				formulario: false,
			},
			{
				nombre: 'z_val',
				descripcion: 'Teorema de límite central',
				tipo: 'number',
				simbolo: '\\(z_{\\frac{\\alpha}{2}}\\)',
				formulario: true,
			},
			{
				nombre: 'p_prom',
				descripcion: 'Proporción muestral',
				tipo: 'number',
				simbolo: '\\(\\bar{p}\\)',
				formulario: true,
			},
			{
				nombre: 'n_val',
				descripcion: 'Tamaño de la muestra',
				tipo: 'number',
				simbolo: '\\(n\\)',
				formulario: true,
				invalid: [0],
			},
		],
		descripcion:
			'El intervalo de confianza para la proporción poblacional está centrado en la proporción muestral; siendo sus límites superior e inferior donde z /2 es el valor crítico correspondiente al grado de confianza 1- de la distribución normal tipificada y es el error típico de la proporción.',
		tema: 'Intervalos de confianza para proporciones',
		titulo: 'Teoría de estimación',
		subtema: ['varianzas'],
	},
	{
		id: 5,
		formula:
			'P : \\bar{X} \\pm z_{\\frac{\\alpha}{2}} * \\sigma_{\\bar{X}}',
		formula2: 'x \\pm z * sigma',
		variables: [
			{
				nombre: 'P',
				descripcion: 'Intervalo de confianza',
				tipo: 'number',
				simbolo: '\\(P\\)',
				formulario: false,
			},
			{
				nombre: 'x',
				descripcion: 'Media de la muestra',
				tipo: 'number',
				simbolo: '\\(\\bar{X}\\)',
				formulario: true,
			},
			{
				nombre: 'z',
				descripcion: 'Teorema de límite central',
				tipo: 'number',
				simbolo: '\\(z_{\\frac{\\alpha}{2}}\\)',
				formulario: true,
			},
			{
				nombre: 'sigma',
				descripcion: 'Error estándar de la media',
				tipo: 'number',
				simbolo: '\\(\\sigma_{\\bar{X}}\\)',
				formulario: true,
			},
		],
		descripcion:
			'Un intervalo de confianza para la media nos da un rango de valores admisibles para la media de la población. Si un intervalo de confianza no incluye un valor determinado, podemos decir que no es probable que el valor particular sea la media verdadera de la población.',
		tema: 'Intervalos de confianza para medias',
		titulo: 'Teoría de estimación',
		subtema: ['varianzas'],
	},
	{
		id: 6,
		formula: '\\(Z = \\frac{\\bar{x} - \\mu}{\\sigma_{\\bar{x}}}\\)',
		formula2: '(x - u)/(sigma)',
		variables: [
			{
				nombre: 'z',
				descripcion: 'Teorema de límite central',
				tipo: 'number',
				simbolo: '\\(Z\\)',
				formulario: false,
			},
			{
				nombre: 'x',
				descripcion: 'Media de la muestra',
				tipo: 'number',
				simbolo: '\\(\\bar{x}\\)',
				formulario: true,
			},
			{
				nombre: 'u',
				descripcion: 'Media poblacional',
				tipo: 'number',
				simbolo: '\\(\\mu\\)',
				formulario: true,
			},
			{
				nombre: 'sigma',
				descripcion: 'Error estándar de la media',
				tipo: 'number',
				simbolo: '\\(\\sigma_{\\bar{x}}\\)',
				formulario: true,
			},
		],
		descripcion: 'Fomulación Hipótesis',
		tema: 'Pruebas de hipótesis para medias 1 población',
		titulo: 'Fomulación Hipótesis',
		subtema: ['varianzas'],
	},
	{
		id: 7,
		formula: '\\(Z = \\frac{\\bar{p} - P}{\\sigma_{\\bar{p}}}\\)',
		formula2: '(p_prom - P)/(sigma)',
		variables: [
			{
				nombre: 'z',
				descripcion: 'Teorema de límite central',
				tipo: 'number',
				simbolo: '\\(Z\\)',
				formulario: false,
			},
			{
				nombre: 'p_prom',
				descripcion: 'Proporción muestral',
				tipo: 'number',
				simbolo: '\\(\\bar{p}\\)',
				formulario: true,
			},
			{
				nombre: 'P',
				descripcion: 'Proporción poblacional',
				tipo: 'number',
				simbolo: '\\(P\\)',
				formulario: true,
			},
			{
				nombre: 'sigma',
				descripcion: 'Media muestral',
				tipo: 'number',
				simbolo: '\\(\\sigma_{\\bar{p}}\\)',
				formulario: true,
			},
		],
		descripcion: 'Pruebas de hipótesis para proporciones 1 población',
		tema: 'Pruebas de hipótesis para proporciones 1 población',
		titulo: 'Fomulación Hipótesis',
		subtema: ['varianzas'],
	},
	{
		id: 8,
		formula: '\\(X^2 = \\frac{(n - 1) * S^2}{\\sigma^2}\\)',
		formula2: '((n - 1) * s)/sigma',
		variables: [
			{
				nombre: 'x',
				descripcion: 'chi-cuadrado',
				tipo: 'number',
				simbolo: '\\(X^2\\)',
				formulario: false,
			},
			{
				nombre: 'n',
				descripcion: 'Tamaño de la muestra',
				tipo: 'number',
				simbolo: '\\(n\\)',
				formulario: true,
			},
			{
				nombre: 's',
				descripcion: 'Varianza muestral',
				tipo: 'number',
				simbolo: '\\(S^2\\)',
				formulario: true,
			},
			{
				nombre: 'sigma',
				descripcion: 'Desviación estándar',
				tipo: 'number',
				simbolo: '\\(\\sigma^2\\)',
				formulario: true,
			},
		],
		descripcion: 'Hipótesis para varianzas 1 población',
		tema: 'Hipótesis para varianzas 1 población',
		titulo: 'Fomulación Hipótesis',
		subtema: ['varianzas'],
	},
	{
		id: 9,
		formula:
			'z = \\frac{(\\bar{X_{1}} - \\bar{X_{2}}) - d_{0}}{\\sqrt{\\frac{\\sigma_{1}^2}{n_{1}} + \\frac{\\sigma_{2}^2}{n_{2}}}}',
		formula2: '((X1 - X2) - d0)/(sqrt((sigma1 / n1) + (sigma2 / n2)))',
		variables: [
			{
				nombre: 'z',
				descripcion: 'Teorema de límite central',
				tipo: 'number',
				simbolo: '\\(z\\)',
				formulario: false,
			},
			{
				nombre: 'X1',
				descripcion: 'Media muestral 1',
				tipo: 'number',
				simbolo: '\\(\\bar{X_{1}}\\)',
				formulario: true,
			},
			{
				nombre: 'X2',
				descripcion: 'Media muestral 2',
				tipo: 'number',
				simbolo: '\\(\\bar{X_{2}}\\)',
				formulario: true,
			},
			{
				nombre: 'd0',
				descripcion: 'Diferencia de medias',
				tipo: 'number',
				simbolo: '\\(d_{0}\\)',
				formulario: true,
			},
			{
				nombre: 'sigma1',
				descripcion: 'Desviación estándar de muestra 1',
				tipo: 'number',
				simbolo: '\\(\\sigma_{1}^2\\)',
				formulario: true,
			},
			{
				nombre: 'sigma2',
				descripcion: 'Desviación estándar de muestra 2',
				tipo: 'number',
				simbolo: '\\(\\sigma_{2}^2\\)',
				formulario: true,
			},
			{
				nombre: 'n1',
				descripcion: 'Tamaño de la muestra 1',
				tipo: 'number',
				simbolo: '\\(n_{1}\\)',
				formulario: true,
			},
			{
				nombre: 'n2',
				descripcion: 'Tamaño de la muestra 2',
				tipo: 'number',
				simbolo: '\\(n_{2}\\)',
				formulario: true,
			},
		],
		descripcion: 'Pruebas de hipótesis para medias 2 poblaciones',
		tema: 'Pruebas de hipótesis para medias 2 poblaciones',
		titulo: 'Fomulación Hipótesis',
		subtema: ['varianzas'],
	},
];
