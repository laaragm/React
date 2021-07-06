import { useState } from 'react';

import './styles.css';

import { ExpenseForm } from '../ExpenseForm/index';

export function NewExpense(props) {
    const [ showForm, setShowForm] = useState(false);
    function saveExpenseDataHandler(enteredExpenseData) {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        }
        props.onAddExpense(expenseData);
    }

    function closeFormHandler() {
        setShowForm(false);
    }

    return(
        <div className="new-expense">
            { showForm 
                ? ( <ExpenseForm onCloseForm={ closeFormHandler } onSaveExpenseData={ saveExpenseDataHandler } /> ) 
                : ( <button onClick={ event => setShowForm(true) }> Add New expense </button> )
            }
        </div>
    );
}