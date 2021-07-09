import Section from '../UI/Section';
import TaskForm from './TaskForm';

import { useHttp } from '../../hooks/UseHttp';

const firebaseBaseUrl = process.env.REACT_APP_FIREBASE;

const NewTask = (props) => {
    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const createTask = (taskText, taskData) => {
        const generatedId = taskData.name; 
        const createdTask = { id: generatedId, text: taskText };
        props.onAddTask(createdTask);
    }

    const enterTaskHandler = async (taskText) => {
        sendTaskRequest(
            { 
                url: `${firebaseBaseUrl}/tasks.json`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: { text: taskText }
            },
            createTask.bind(null, taskText)
        );
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
                {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
