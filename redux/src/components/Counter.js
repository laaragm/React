import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

import { counterActions }  from '../store/counterSlice';

const Counter = () => {
    // dispatch is a function we can call to dispatch an action against the store
    const dispatch = useDispatch();
    // useSelector is the hook we use for getting data out of the store
    const counter = useSelector((state) => state.counter.counter);
    const hasToShow = useSelector((state) => state.counter.showCounter);

    const incrementHandler = () => {
        // dispatch({ type: 'increment' });
        dispatch(counterActions.increment()); // Using Redux Toolkit
    };

    const decrementHandler = () => {
        // dispatch({ type: 'decrement' });
        dispatch(counterActions.decrement());
    };

    const increaseHandler = () => {
        // the amount property in this case is an action payload
        // dispatch({ type: 'increase', amount: 5 });
        dispatch(counterActions.increase(5));
    };

    const toggleCounterHandler = () => {
        // dispatch({ type: 'toggle' });
        dispatch(counterActions.toggle());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            { hasToShow && <div className={classes.value}>{ counter }</div> }
            <div>
                <button onClick={ incrementHandler }> Increment </button>
                <button onClick={ increaseHandler }> Increase By 5 </button>
                <button onClick={ decrementHandler }> Decrement </button>
            </div>
            <button onClick={ toggleCounterHandler }> Toggle Counter </button>
        </main>
    );
};

export default Counter;
