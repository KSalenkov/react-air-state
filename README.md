# React Air State

This library is designed to create a simple state outside react components.
The state is reactive and can be obtained using the built-in `useValue` hook.

**The library does not use the context and provider, so connecting and using it becomes very simple.**

**Warning!** This library has not been used in a real project, use it at your own risk. I will be glad to receive feedback.

## Installation

```npm
npm install react-air-state
```

## Using

```ts
/* File counterState.ts */
import {airState} from "react-air-state"

export const counterState = airState(0)
```

```tsx
/* File Counter.tsx */
import {counterState} from "./counterState"

const CounterComponent = () => {
    const counter = counterState.useValue()

    const increase = () => {
        counterState.dispatch(prevState => prevState + 1)
    }
    
    return (
        <div>
            <h1>{counter}</h1>
            
            <button onClick={increase}>Increase</button>
        </div>
    )
}
```


# `airState` 
Factory Function that creates an object with the required set of methods.
It takes 1 argument, which is the default state value.
If there is no default value, you must explicitly specify the future state type
`const valueState = airState<string>()`

# Methods

## `dispatch`
This method allows you to update the state to a different value and start re-visualization. You can pass the new state directly or a function that calculates it from the previous state

## `useValue`
The hook to extract the current state

## `subscribe`
This method for passing your function to subscribe to a state change

## `getValue`
This method allows you to get the current state



