import { useContext } from 'react';

import classes from './Home.module.css';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

import { AuthContext } from '../../context/AuthContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    return (
        <Card className={ classes.home }>
            <h1>Welcome back!</h1>
            <Button onClick={ authContext.onLogout }> Logout </Button>
        </Card>
    );
};

export default Home;
