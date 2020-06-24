import React from 'react';
import './App.css';
import axios from "axios";

const logo = require("./logo.svg");

interface Todos {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export const App = () => {
    const [state, setState] = React.useState<Array<Todos>>([]);

    React.useEffect(() => {
        (async function getTodos() {
            let responce: any;
            try {
                responce = await axios.get("https://jsonplaceholder.typicode.com/todos");
                setState(responce);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            {state.slice(0, 20).map(todo => (
                <p>{todo.id + ": " +todo.title}</p>
            ))}
        </div>
    );
};

export default App;
