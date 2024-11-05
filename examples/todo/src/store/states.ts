import {airState} from "air-state";

export const inputValueState = airState("");

export type TodoItem = {
    name: string;
    checked: boolean;
    id: string;
}
export const todoState = airState<TodoItem[]>([]);


