import React from "react";
import {inputValueState, todoState} from "../store/states";

export const Control = () => {
    const value = inputValueState.useValue();

    if (value) {
        const addTodo = () => {
            todoState.dispatch(prev => [...prev, {
                name: value,
                checked: false,
                id: Date.now().toString()
            }])

            inputValueState.dispatch("")
        }

        return (
            <button type="button" className="button" onClick={addTodo}>
                Добавить
            </button>
        );
    }

    return null
};
