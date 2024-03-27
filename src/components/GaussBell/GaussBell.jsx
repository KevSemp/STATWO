import React from 'react';
import {
	VictoryChart,
	VictoryLine,
	VictoryTheme,
	VictoryLabel,
	VictoryArea,
	VictoryScatter,
	VictoryAxis,
} from 'victory';
import {
	getData,
	LeftArea,
	RightArea,
	isHipotesisValid,
	getYMax,
} from './GaussGraphic';

// Verificar si z está dentro del rango válido
export default function GaussBell({
	xLimit = 10,
	alpha1,
	alpha2,
	z = 0,
	mean = 0,
}) {
	// Datos para las áreas sombreadas
	const shadedAreaData1 = LeftArea(xLimit, alpha1, mean);
	const shadedAreaData2 = RightArea(xLimit, alpha2, mean);
	const isZHipotesisValid = isHipotesisValid(z, xLimit, alpha1, alpha2, mean);
	const yMax = getYMax(xLimit, mean);
	const yDomain = [0, yMax * 1.2];
	const data = getData(xLimit, mean);
	return (
		<VictoryChart
			theme={VictoryTheme.material}
			domain={{ x: [mean - xLimit, mean + xLimit], y: yDomain }}
			style={{ parent: { background: 'white' } }}
		>
			<VictoryAxis tickFormat={() => ''} />
			<VictoryAxis dependentAxis tickFormat={() => ''} />
			<VictoryLine
				data={data}
				style={{ data: { stroke: 'black' } }}
				x='x'
				y='y'
			/>
			<VictoryArea
				data={shadedAreaData1}
				style={{ data: { fill: '#f76d64' } }}
			/>
			<VictoryArea
				data={shadedAreaData2}
				style={{ data: { fill: '#f76d64' } }}
			/>
			{alpha1 && alpha1 <= mean && (
				<VictoryLine
					data={[
						{ x: alpha1, y: 0 },
						{ x: alpha1, y: yMax },
					]}
					style={{ data: { stroke: '#f76d64', strokeWidth: 2 } }}
				/>
			)}
			{alpha1 && (
				<VictoryScatter
					data={[{ x: alpha1, y: 0 }]}
					size={0}
					labels={({ datum }) => `α1 = ${datum.x}`}
					labelComponent={<VictoryLabel dy={30} />}
				/>
			)}
			{alpha2 && alpha2 >= mean && (
				<VictoryLine
					data={[
						{ x: alpha2, y: 0 },
						{ x: alpha2, y: yMax },
					]}
					style={{ data: { stroke: '#f76d64', strokeWidth: 2 } }}
				/>
			)}
			{alpha2 && (
				<VictoryScatter
					data={[{ x: alpha2, y: 0 }]}
					size={0}
					labels={({ datum }) => `α2 = ${datum.x}`}
					labelComponent={<VictoryLabel dy={30} />}
				/>
			)}
			{isZHipotesisValid && (
				<VictoryLine
					data={[
						{ x: z, y: 0 },
						{ x: z, y: yMax },
					]}
					style={{ data: { stroke: 'darkblue' } }}
				/>
			)}
			{isZHipotesisValid && (
				<VictoryScatter
					data={[{ x: z, y: yMax }]}
					size={0}
					labels={({ datum }) => `z = ${datum.x}`}
					labelComponent={<VictoryLabel />}
				/>
			)}
			{!isZHipotesisValid && (
				<VictoryLabel
					text='El valor de z no es un punto válido.'
					x={200}
					y={30}
					textAnchor='middle'
				/>
			)}
		</VictoryChart>
	);
}
