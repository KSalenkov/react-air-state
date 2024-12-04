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


# airState

Factory Function that creates an object with the required set of methods.
It takes 1 argument, which is the default state value.
If there is no default value, you must explicitly specify the future state type
`const valueState = airState<T>(defaultValue?: T, options?: AirStateOptions)`

## Methods

### `dispatch`
This method allows you to update the state to a different value and start re-visualization. You can pass the new state directly or a function that calculates it from the previous state

### `useValue`
The hook to extract the current state

### `useSelect`
The hook that extracts the state calculated by the function (selector) passed to it

### `createSelector`
Function for creating a typed selector

#### Example with `useSelect` and `createSelector`

```tsx
import {airState} from "react-air-state"

export const userState = airState({
    name: "Smith",
    token: "token"
})

const selectToken = userState.createSelector((user) => user.token)

const Component = () => {
    const token = userState.useSelect(selectToken);
    
    /* ... */
}
```

### `subscribe`
This method for passing your function to subscribe to a state change

### `getValue`
This method allows you to get the current state

## Options

### `localStorageKey?: string`
Set the key for localStorage so that your state is saved in it

# combineAirState

Factory Function for combining different states into one. It takes 2 arguments:
- array of states
- function that calculates a new state based on the transmitted states

### Example

```tsx
import {airState, combineAirState} from "react-air-state"

const postsState = airState([
    {
        id: 1,
        title: 'Post 1'
    },
    {
        id: 2,
        title: 'Post 2'
    }
])

const commentsState = airState([
    {
        id: 1,
        postId: 1,
        message: 'Comment 1'
    },
    {
        id: 2,
        postId: 1,
        message: 'Comment 2'
    }
])

const normalizePostsState = combineAirState([postsState, commentsState], (posts, comments) => {
    return posts.map(post => ({
        ...post,
        comments: comments.filter(comment => comment.postId === post.id)
    }))
})

const PostsComponent = () => {
    const posts = normalizePostsState.useValue()
    
    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>Comment count: {post.comments.length}</p>
                </div>
            ))}
        </div>
    )
}
```

## Methods

`combineAirState` creates an object with the same methods as `airState`, except for the methods `dispatch`, `useSelect`, `createSelector`
