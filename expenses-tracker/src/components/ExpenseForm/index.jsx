import { useState } from 'react';

import './styles.css';

export function ExpenseForm(props) {
    const [ title, setTitle ] = useState('');
    const [ amount, setAmount] = useState('');
    const [ date, setDate ] = useState('');

    function addExpenseHandler(event) {
        event.preventDefault();
        
        const expenseData = buildNewExpense();
        props.onSaveExpenseData(expenseData);
        eraseForm();
    }

    function buildNewExpense() {
        return {
            title,
            amount: +amount,
            date: new Date(date)
        };
    }

    function eraseForm() {
        setTitle('');
        setAmount('');
        setDate('');
    }

    return(
        <form onSubmit={ addExpenseHandler }>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label> Title </label>
                    <input 
                        type="text"
                        value={ title }
                        onChange={ event => setTitle(event.target.value) }
                    />
                </div>
            </div>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label> Amount </label>
                    <input 
                        type="number"
                        value={ amount }
                        onChange={ event => setAmount(event.target.value) } 
                        min="0.01" 
                        step="0.01" 
                    />
                </div>
            </div>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label> Date </label>
                    <input 
                        type="date"
                        value={ date }
                        onChange={ event => setDate(event.target.value) } 
                        min="2019-01-01" 
                        max="2022-12-31" 
                    />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={ props.onCloseForm }> Cancel </button>
                <button type="submit"> Add expense </button>
            </div>
        </form>
    );
}