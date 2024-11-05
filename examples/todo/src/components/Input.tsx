import React from "react";
import {inputValueState} from "../store/states";

export const Input = () => {
    const value = inputValueState.useValue();
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputValueState.dispatch(event.target.value)
    }

    return (
        <input className={"input"} value={value} onChange={handleChangeInput} />
    );
};
