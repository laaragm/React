import { useContext } from 'react';

import classes from './MainHeader.module.css';

import Navigation from './Navigation';

import { AuthContext } from '../../context/AuthContext';

const MainHeader = () => {
    const authContext = useContext(AuthContext);

    return (
        <header className={ classes['main-header'] }>
            <h1> A Typical Page </h1>
            <Navigation onLogout={ authContext.onLogout } />
        </header>
    );
};

export default MainHeader;
