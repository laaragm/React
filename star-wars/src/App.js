import React, { useState, useEffect, useCallback } from 'react';

import './App.css';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

const baseStartWarsUrl = process.env.REACT_APP_FIREBASE_STAR_WARS;

function App() {
    const [ movies, setMovies ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        startLoading();
        dismissPreviousErrors();
        try { 
            const response = await fetch(`${baseStartWarsUrl}/movies.json`);
            console.log(response)
            if (!response.ok || response.length === 0) {
                throw new Error('Something went wrong! Please try again later.');
            }

            const data = await response.json();

            const loadedMovies = [];
            for (const key in data) {
                loadedMovies.push({
                    id: key, 
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate
                })
            }
            orderByReleaseDate(loadedMovies);
            setMovies(loadedMovies);
        } catch (errors) {
            setError(errors.message);
        }
        stopLoading();
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    function startLoading() {
        setIsLoading(true);
    }

    function stopLoading() {
        setIsLoading(false);
    }

    function dismissPreviousErrors() {
        setError(null);
    }

    async function addMovieHandler(movie) {
        const response = await fetch(`${baseStartWarsUrl}/movies.json`, {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        fetchMoviesHandler();
    }

    function orderByReleaseDate(movies) {
        return movies.sort(dynamicSort('releaseDate'));
    }

    function dynamicSort(property) {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    return (
        <>
            <section>
                <AddMovie onAddMovie={ addMovieHandler } />
            </section>
            <section>
                <button onClick={ fetchMoviesHandler }>Fetch Movies</button>
            </section>
                { !isLoading && movies.length > 0 && (
                    <section>
                        <MoviesList movies={ movies } /> 
                    </section>
                )}
                { isLoading && (
                    <section>
                        <p> Loading... </p>
                    </section> 
                )}
                { !isLoading && error && (
                    <section>
                        <p> { error } </p>
                    </section> 
                )}
        </>
    );
}

export default App;
