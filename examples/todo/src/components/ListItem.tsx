import React from "react";
import {TodoItem} from "../store/states";

interface ListItemProps {
    todoItem: TodoItem;
    handleChecked: (id: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({todoItem, handleChecked}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChecked(event.target.value)
    }

    return (
        <li>
            <input checked={todoItem.checked} type="checkbox" value={todoItem.id} onChange={handleChange} />

            {todoItem.name}
        </li>
    );
};
