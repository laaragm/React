import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

import { useHttp } from './hooks/UseHttp';

const firebaseBaseUrl = process.env.REACT_APP_FIREBASE;

function App() {
    const [tasks, setTasks] = useState([]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        const transformTasks = (tasks) => {
            const loadedTasks = [];
            for (const taskKey in tasks) {
                loadedTasks.push({ id: taskKey, text: tasks[taskKey].text });
            }
    
            setTasks(loadedTasks);
        };
        console.log(`${firebaseBaseUrl}/tasks.json`);
        fetchTasks({ url: `${firebaseBaseUrl}/tasks.json` }, transformTasks);
    }, [fetchTasks]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </>
    );
}

export default App;
