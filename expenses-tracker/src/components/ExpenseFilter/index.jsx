import { useState } from 'react';

import './styles.css';

export function ExpenseFilter(props) {
    const years = [2019, 2020, 2021, 2022];

    function filterYearHandler(event) {
        props.onFilterChange(event.target.value);
    }

    return(
        <div className='expenses-filter'>
            <div className='expenses-filter__control'>
                <label>Filter by year</label>
                <select value={ props.selectedYear } onChange={ filterYearHandler }>
                    <option value={ years[3] }> { years[3] } </option>
                    <option value={ years[2] }> { years[2] } </option>
                    <option value={ years[1] }> { years[1] } </option>
                    <option value={ years[0] }> { years[0] } </option>
                </select>
            </div>
        </div>
    );
}