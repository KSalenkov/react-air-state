import React from 'react';
import './App.css';

import { Input } from './components/Input';
import { Control } from './components/Control';
import { List } from './components/List';

const App = () => {
    return (
        <div className="app">
            <h2>To do list</h2>

            <Input />

            <List />

            <Control />
        </div>
    );
};

export default App;
