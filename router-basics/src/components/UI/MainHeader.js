import { NavLink } from 'react-router-dom';

import classes from './MainHeader.module.css';

export function MainHeader() {
    return(
        <header className={classes.header}>
            <ul>
                <li>
                    <NavLink activeClassName={classes.active} to="/welcome"> Welcome </NavLink>
                </li>
                <li>
                    <NavLink activeClassName={classes.active} to="/products"> Products </NavLink>
                </li>
            </ul>
        </header>
    );
}