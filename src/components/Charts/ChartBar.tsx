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
            text: 'Receita e Despesa',
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
            data: [1, 2, 3, 4, 5, 6, 7,],
            backgroundColor: '#2CDA9D',
            stack: 'Stack 0',
          },
          {
            label: 'Despesa',
            data: [-1, -2, -3, -4, -5, -6, -7],
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