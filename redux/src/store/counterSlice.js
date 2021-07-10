import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

/* We're preparing a slice of our global state, and when we have different pieces of
state we could which are not directly related we could create different slices (even
in different files) to make our code maintainable */
export const counterSlice = createSlice({ 
    name: 'counter',
    initialState: initialCounterState,
    reducers: { 
        increment(state) {
            // Here we are allowed to mutate the state (Redux Toolkit).
            // Redux toolkit internally uses another package which will detect code
            // like the one below and automatically clone the existing data,
            // create a new state object, keep all the state which we're not editing
            // and then override the state which we are editing in an immutable way
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload;
        },
        toggle(state) {
            state.showCounter = !state.showCounter;
        },
    }
});

// Action creators
// The objects created will have a type property with a unique identifier per action.
export const counterActions = counterSlice.actions;