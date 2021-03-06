import './styles.css';

import { ChartBar } from './ChartBar';

export function Chart(props) {
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMaximum = Math.max(...dataPointValues);
    console.log(props.dataPoints)

    return(
        <div className="chart">
            { 
                props.dataPoints.map(dataPoint => 
                    <ChartBar
                        key={ dataPoint.label }
                        value={ dataPoint.value } 
                        maxValue={ totalMaximum } 
                        label={ dataPoint.label }
                        hasToEraseContent={ !dataPoint.active }
                    />
                ) 
            }
        </div>
    ); 
}