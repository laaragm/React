import { useState } from 'react';

import './styles.css';

import { ExpenseItem } from '../ExpenseItem/index';
import { Card } from '../Card/index';
import { ExpenseFilter } from '../ExpenseFilter/index';
import { ExpensesChart } from '../ExpensesChart/index';

export function Expenses(props) {
    const [ filteredYear, setFilteredYear ] = useState('2021');

    const filteredExpenses = props.items.filter(x => {
        return x.date.getFullYear().toString() === filteredYear;
    });

    function filterExpensesByYearHandler(selectedYear) {
        setFilteredYear(selectedYear);
    }

    return(
        <>
            <Card className="expenses">
            <ExpenseFilter
                onFilterChange={ filterExpensesByYearHandler }
                selectedYear={ filteredYear }
            />
            <ExpensesChart filteredExpenses={ filteredExpenses } allExpenses={ props.items } />
            { filteredExpenses.length === 0 
                ? (<p className="no-expenses"> No expenses found</p> )
                : (
                    filteredExpenses.map(expenseItem => {
                        return (
                            <ExpenseItem 
                                key={ expenseItem.id }
                                title={ expenseItem.title } 
                                amount={ expenseItem.amount } 
                                date={ expenseItem.date }
                            />
                        );
                    }) 
                )
            }
            </Card>
        </>
    );
}