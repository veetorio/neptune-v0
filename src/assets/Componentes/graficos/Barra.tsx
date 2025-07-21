
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

// Registre os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Barra(props: { title : string , data : number[],labels : string[] , dominante : "x" | "y"}) {
    const options : ChartOptions<"bar"> = {
        indexAxis : props.dominante,
        scales : {
            y : {
                grid : {
                    color : "#343434"
                }
            },
            x : {
                grid : {
                    color : "#3f3f3f"
                }
            },
        },
        plugins : {
            
            legend  : {
                display : false,
            },
            title : {
                text : props.title,
                color : "#fff",
                align : "start",
                position : "top",
                display : true
            }
        }
    }
    return <Bar options={options} data={{
        labels : props.labels,
        datasets : [{
            data : props.data,
            backgroundColor : "rgba(147, 51, 234, 1)"
        }]
    }}/>
}

export default Barra