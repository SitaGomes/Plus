import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
export function ChartBar() {

    const options = {
        plugins: {
            title: {
            display: true,
            text: 'Receita vs Despesa',
            },
        },
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
            stacked: true,
            },
            y: {
            stacked: true,
            },
        },
    };
      
    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 
    'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Receita',
            data: [800, 1000, 1165, 1380, 1600, 1710, 1801,  2001, 2001, 2200, 2300, 2450],
            backgroundColor: '#2CDA9D',
            stack: 'Stack 0',
          },
          {
            label: 'Despesa',
            data: [2200, 2000, 1835, 1620, 1400, 1290, 1199, 999, 999, 800, 700, 650],
            backgroundColor: '#EE6C4D',
            stack: 'Stack 1',
          },
        ],
    };
      

    return  <Bar
        options={options}
        data={data}
    />
}