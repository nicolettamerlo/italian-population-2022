import Chart from 'chart.js/auto';
import { data } from './data';
import { legendPlugin } from './legendPlugin';
import { tooltipPlugin } from './tooltipPlugin';
import { ctx } from './domVariables';

const config = {
    type: "doughnut",
    data: data,
    options: {
        hoverOffset:4,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false
            },
            tooltip: tooltipPlugin
        }     
    },
    plugins: [legendPlugin]
};

new Chart(ctx, config);