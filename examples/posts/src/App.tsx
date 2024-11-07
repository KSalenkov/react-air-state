import React, { useEffect } from 'react';
import './App.css';
import { init } from './utils/api';
import { Posts } from './components/Posts';

const App = () => {
    useEffect(() => {
        const abortController = new AbortController();

        init({ signal: abortController.signal });

        return () => {
            abortController.abort('strict mode');
        };
    }, []);

    return (
        <div className="app">
            <h2>Posts</h2>

            <Posts />
        </div>
    );
};

export default App;
