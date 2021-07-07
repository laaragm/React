import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import './CourseGoalItem.css';

import { RoundedButton } from '../../UI/Button/RoundedButton';

const CourseGoalItem = props => {
    const deleteHandler = () => {
        props.onDelete(props.id);
    };

    return (
        <li className="goal-item">
            { props.children }
            <RoundedButton onClick={ deleteHandler }> 
                <DeleteIcon fontSize="small" />
            </RoundedButton>
        </li>
    );
};

export default CourseGoalItem;
