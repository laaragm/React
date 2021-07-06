import { useState } from 'react';

import './styles.css';

import { ExpenseDate } from '../ExpenseDate/index';
import { Card } from '../Card/index';

export function ExpenseItem(props) {
    const [title, setTitle] = useState(props.title);

    return(
        <div>
            <Card className="expense-item">
                <ExpenseDate date={ props.date } />
                <div className="expense-item__description">
                    <h2> { props.title } </h2>
                    <div className="expense-item__price"> ${ props.amount } </div>
                </div>
            </Card>
        </div>
    );
}