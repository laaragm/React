import React, { useRef, useState } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
    const titleRef = useRef('');
    const openingTextRef = useRef('');
    const releaseDateRef = useRef('');

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredOpeningText, setEnteredOpeningText] = useState('');
    const [enteredReleaseDate, setEnteredReleaseDate] = useState('');

    function submitHandler(event) {
        event.preventDefault();
        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
        };

        props.onAddMovie(movie);
        clearForm();
    }

    function clearForm() {
        setEnteredTitle('');
        setEnteredOpeningText('');
        setEnteredReleaseDate('');
    }

    function titleChangeHandler(event) {
        setEnteredTitle(event.target.value);
    }

    function openingTextChangeHandler(event) {
        setEnteredOpeningText(event.target.value);
    }

    function releaseDateHandler(event) {
        setEnteredReleaseDate(event.target.value);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input 
                    type='text' 
                    id='title' 
                    ref={titleRef} 
                    onChange={titleChangeHandler} 
                    value={enteredTitle} 
                />
            </div>
            <div className={classes.control}>
                <label htmlFor='opening-text'>Opening Text</label>
                <textarea 
                    rows='5' 
                    id='opening-text' 
                    ref={openingTextRef} 
                    onChange={openingTextChangeHandler}
                    value={enteredOpeningText}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor='date'>Release Date</label>
                <input 
                    type='text' 
                    id='date' 
                    ref={releaseDateRef} 
                    onChange={releaseDateHandler}
                    value={enteredReleaseDate}
                />
            </div>
            <button>Add Movie</button>
        </form>
    );
}

export default AddMovie;
