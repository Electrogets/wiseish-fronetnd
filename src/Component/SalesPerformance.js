import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', 'group D', 'group E', 'group F'] }]}
            series={[{ data: [4, 3, 5, 6, 7, 8] }, { data: [1, 6, 3, 5, 6, 7] }]}
            width={900}
            height={300}
        />
    );
}