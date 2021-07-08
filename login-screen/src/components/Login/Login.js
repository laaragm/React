import { useState, useEffect, useReducer, useContext, useRef } from 'react';

import classes from './Login.module.css';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

import { AuthContext } from '../../context/AuthContext';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.value, isValid: isEmailValid(action.value) };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: isEmailValid(state.value) };
    }

    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.value, isValid: isPasswordValid(action.value) };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: isPasswordValid(state.value) };
    }

    return { value: '', isValid: false };
};

const isPasswordValid = (password) => {
    return password.trim().length > 6;
}

const isEmailValid = (email) => {
    return email.includes('@');
}

const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    const authContext = useContext(AuthContext);
    
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    // first argument: a function that is triggered once an action is dispatched
    // second argument: the initial state
    const [ emailState, dispatchEmail ] = useReducer(emailReducer, { 
        value: '',
        isValid: null 
    });

    const [ passwordState, dispatchPassword ] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    });

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            const isValid = isFormValid();
            setFormIsValid(isValid);
        }, 500);

        /* cleanup function: this will run as a cleanup process before useEffect
        executes this function the next time; basically whenever useEffect runs,
        except for the very first time when it runs, the cleanup function will run
        and also whenever the component you're specifying is reused */
        return () => {
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    function isFormValid() {
        return passwordIsValid && emailIsValid;
    }

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', value: event.target.value });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authContext.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.activateInputField();
        } else {
            passwordInputRef.current.activateInputField();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-mail"
                    type="email"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
