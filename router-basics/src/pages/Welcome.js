import { Route } from 'react-router-dom';

export function Welcome() {
    return (
        <section>
            <h1> The Welcome Page </h1>
            <Route path="/welcome/newUser">
                <p>Welcome, new user</p>
            </Route>
        </section>
    );
}