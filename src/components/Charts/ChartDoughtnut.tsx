import React from 'react';
import { Box } from '@chakra-ui/react';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IChartDoughtnut {
  chartTitle: string;
  price: number[];
  labels: string[];
  title: string;
  backgroundColors: string[];

}

export function ChartDoughtnut({chartTitle, labels, price, title, backgroundColors}: IChartDoughtnut) {

  const options = {
    plugins: {
        title: {
        display: true,
        text: chartTitle,
        },
    },
    responsive: true,
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: price,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };


  return <Box w={["100%", "100%", "100%", "500px"]}><Doughnut data={data} options={options}/></Box>;
}
