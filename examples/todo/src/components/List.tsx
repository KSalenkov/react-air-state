import {todoState} from "../store/states";
import {ListItem} from "./ListItem";

export const List = () => {
    const todoList = todoState.useValue();

    const handleChecked = (id: string) => {
        todoState.dispatch(prevState => prevState.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }

            return item
        }))
    }

    return (
        <ul>
            {todoList.map((item) => (
                <ListItem key={item.id} todoItem={item} handleChecked={handleChecked} />
            ))}
        </ul>
    )
}
