import { useState, useEffect } from 'react';

import { Chart } from '../Chart/Chart';

const initialDataPoints = [
    { label: 'Jan', value: 0, active: false },
    { label: 'Feb', value: 0, active: false },
    { label: 'Mar', value: 0, active: false },
    { label: 'Apr', value: 0, active: false },
    { label: 'May', value: 0, active: false },
    { label: 'Jun', value: 0, active: false },
    { label: 'Jul', value: 0, active: false },
    { label: 'Aug', value: 0, active: false },
    { label: 'Sep', value: 0, active: false },
    { label: 'Oct', value: 0, active: false },
    { label: 'Nov', value: 0, active: false },
    { label: 'Dec', value: 0, active: false },
];

export function ExpensesChart(props) {
    const [ dataPoints, setDataPoints ] = useState(initialDataPoints);

    resetInitialDataPoints();
    for (const expense of props.allExpenses) {
        const expenseMonth = expense.date.getMonth();
        if (props.filteredExpenses.includes(expense)) {
            console.log(expense)
            initialDataPoints[expenseMonth].active = true;
            initialDataPoints[expenseMonth].value += expense.amount;
        }
    }

    function resetInitialDataPoints() {
        for (let i = 0; i < initialDataPoints.length; i++) {
            initialDataPoints[i].active = false;
            initialDataPoints[i].value = 0;
        }
    }

    return(
        <>
            <Chart dataPoints={ dataPoints } />
        </>
    );
}