// Función para la distribución normal
function normalDistribution(x, mean, variance) {
	return (
		(1 / Math.sqrt(2 * Math.PI * variance)) *
		Math.exp(-Math.pow(x - mean, 2) / (2 * variance))
	);
}

const getVariation = (xLimit) => Math.pow(xLimit / 3, 2);

// Generar datos para la gráfica
export const getData = (xLimit, mean = 0) => {
	const numPoints = xLimit * 100; // Ajusta este valor según tus necesidades
	const variance = getVariation(xLimit); // Ajusta la varianza en función de xLimit
	const data = Array(numPoints)
		.fill(0)
		.map((_, i) => {
			const x = mean - xLimit + (i * 2 * xLimit) / (numPoints - 1);
			const y = normalDistribution(x, mean, variance);
			return { x, y };
		});
	return data;
};

// Datos para las áreas sombreadas
export const LeftArea = (xLimit, alpha1, mean = 0) => {
	if (alpha1 === null) return [];
	if (alpha1 >= mean) return [];
	const data = getData(xLimit, mean);
	return data.filter(
		(datum) => datum.x >= mean - xLimit && datum.x <= alpha1
	);
};
export const RightArea = (xLimit, alpha2, mean = 0) => {
	if (alpha2 === null) return [];
	if (alpha2 <= mean) return [];
	const data = getData(xLimit, mean);
	return data.filter(
		(datum) => datum.x >= alpha2 && datum.x <= mean + xLimit
	);
};

// si alpha 1 es null tomar negtive x y si alpha 2 es null tomar positive x, adicional a eso si alpha 1 y alpha 2 son null devolver un true
export const isHipotesisValid = (z, xLimit, alpha1, alpha2, mean = 0) => {
	if (z === null) return false;
	if (alpha1 === null && alpha2 === null) return true;
	if (alpha1 >= 0 || alpha2 <= 0) return true;
	const left = alpha1 || mean - xLimit;
	const right = alpha2 || mean + xLimit;
	return z > left && z < right;
};

// Ajustar el dominio del eje y en función de xLimit
export const getYMax = (xLimit, mean = 0) => {
	const variance = getVariation(xLimit);
	return normalDistribution(mean, mean, variance);
};
