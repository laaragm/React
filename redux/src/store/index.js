import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice';
import { counterSlice } from './counterSlice';

// const initialCounterState = { counter: 0, showCounter: true };

/* The reducer always returns a brand new state object, so remember it won't
be merged with the existing state. The existing state will be overwritten.
We must always set all the other states when we update a piece of state. 
Never mutate the existing state, always override it by returning a new state object. */
// const counterReducer = (state = initialCounterState, action) => {
//     if (action.type === 'increment') {
//         // never do something like this here: state.counter++
//         // always return a new state object
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter
//         };
//     }

//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         };
//     }

//     if (action.type === 'increase') {
//         return {
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter
//         };
//     }

//     if (action.type === 'toggle') {
//         return {
//             counter: state.counter,
//             showCounter: !state.showCounter
//         };
//     }

//     return state;
// }

// create store wants a pointer at a reducer function as a parameter
// export const store = createStore(counterReducer);

// configureStore creates a store but it makes merging multiple reducers into one
// reducer easier thereafter. Here we can create a map of reducers and then this 
// map is set as a value for the main reducer and behind the scenes configureStore
// will merge all those reducers into one big reducer
export const store = configureStore({ 
    reducer: {
        auth: authSlice.reducer,
        counter: counterSlice.reducer
    }
});