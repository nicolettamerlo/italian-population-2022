import { colors } from './colors';
export const population = [
    {
        "age": "0-14 years",
        "males": 4292431,
        "females":4097732,
    },
    {
        "age": "15-24 years",
        "males": 3005402,
        "females":2989764,
    },
    {
        "age": "25-54 years",
        "males": 12577764,
        "females":12921614,
    },
    {
        "age": "55-64 years",
        "males": 4243735,
        "females":4493581,
    },
    {
        "age": "65 years and over",
        "males": 5949560,
        "females":7831076,
    }
];
export const data = {
    labels: ["females", "males", ...population.map(group => group.age)],
    datasets: [
        // outer dataset contains all data (null replaces second dataset values)
        {
            data: [null, null,...population.map(group => group.males + group.females)],
            backgroundColor: colors.bg,
            hoverBackgroundColor: colors.bgHover,
            radius:"98%",
            cutout:"35%",
        },
        // inner dataset
        {
            data: [population.reduce((acc, group) => acc + group.females, 0), population.reduce((acc, group) => acc + group.males, 0)],
            backgroundColor: [colors.bg[0],colors.bg[1]],
            radius:"60%",
            cutout:"40%"
        },
    ]
};

