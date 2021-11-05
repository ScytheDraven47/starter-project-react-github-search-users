// STEP 1 - Include Dependencies
// Include react
import React from 'react'

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts'

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

export const CHART_TYPES = {
	PIE: 'pie',
	BAR: {
		X: 'bar',
		Y: 'column',
	},
	DONUT: 'doughnut',
	DOUGHNUT: 'doughnut',
	PARETO: 'pareto',
}

// STEP 4 - Return the react-fusioncharts component
const ChartComponent = ({
	chartData,
	chartType,
	isFlat,
	title,
	subtitle,
	suffix,
	labelX,
	labelY,
}) => {
	// STEP 3 - Creating the JSON object to store the chart configurations
	const chartConfigs = {
		type: chartType.concat(isFlat === false ? '3d' : '2d'), // The chart type
		width: '100%', // Width of the chart
		height: '400', // Height of the chart
		dataFormat: 'json', // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				//Set the chart caption
				caption: title || '',
				//Set the chart subcaption
				subCaption: subtitle || '',
				//Set the x-axis name
				xAxisName: labelX || '',
				//Set the y-axis name
				yAxisName: labelY || '',
				numberSuffix: suffix || '',
				showPercentValues: 0,
				//Set the theme for your chart
				theme: 'candy',
				decimals: 0,
				pieRadius: '45%',

				// Styling
				paletteColors: '#37c890,#da4991,#37bcc8,#5f57fa,#f0b428',
				canvasbgColor: '#222222',
				canvasbgAlpha: '100',
				bgColor: '#222222',
				bgAlpha: '100',
				captionFont: '"Roboto", sans-serif',
				captionFontSize: '1rem',
				captionFontColor: '#f1f5f8',
				captionFontBold: '1',
				subcaptionFont: '"Open Sans", sans-serif',
				subcaptionFontSize: '1rem',
				subcaptionFontColor: '#829ab0',
				subcaptionFontBold: '0',
				labelFont: '"Open Sans", sans-serif',
				labelFontColor: '#829ab0',
				labelFontSize: '12px',
				labelFontBold: '0',
				lableFontItalic: '1',
				legendItemFontBold: '0',
				legendItemFont: '"Open Sans", sans-serif',
				legendItemFontSize: '12',
				legendItemFontColor: '#829ab0',
			},
			// Chart Data
			data: chartData,
		},
	}

	return <ReactFC {...chartConfigs} />
}

export default ChartComponent
