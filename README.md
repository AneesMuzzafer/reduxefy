# Reduxefy

**Reduxefy** is a bare minimum lightweight implementation of Redux that that won't weigh down your code like a sumo wrestler on a trampoline.

While Redux is a true masterpiece of state management (Dan Abramov is a genius), with an elegant design and a powerful set of features, I wanted to create my own version that mimics its core functionality without ever peeking at the source code. It's like I built this while blindfolded and juggling flaming torches - but don't worry, I promise it works!

## Installation

You can install this package via npm by running:

    npm install reduxefy

## Usage

**Reduxefy** may be a lightweight implementation of Redux, but it still packs a punch. Just like Redux, it exports:

> ***createStore***
> ***combineReducers***
> ***applyMiddeware*** enhancer
> ***thunkMiddleware***

to give you all the essential tools for managing your app's state. And with Reduxefy's stripped-down approach, you can enjoy all of these features without feeling like you're carrying around unnecessary baggage. So go ahead, give Reduxefy a spin and see how it compares to the big dog in the yard.

Use createStore just like you'd do with Redux

   ```js
import { createStore } from 'reduxefy';

function counter(state = 0, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

const store = createStore(counter);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
unsubscribe();
```

Reduxefy  includes the ***"combineReducers"*** feature so you can combine multiple reducers into a single one.
You can also create a store with any enhancer you want! The  ***"applyMiddleware"*** enhancer is shipped by default that lets you add any middleware to your store. And to tackle those pesky Async functions, the ***"thunkMiddleware"*** is also included that will make your life so much easier. Who needs a magic wand when you've got *Reduxefy*?"

Here is a more complete example:

```js
import { createStore, combineReducers, applyMiddleware, thunkMiddleware } from "reduxefy";

const userInitialState = {
    users: [],
    loading: false,
    currentUser: ""
};

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return { ...state, users: [...state.users, action.payload] };
        case "TOGGLE_LOADING":
            return { ...state, loading: !state.loading };
        case "SET_USER":
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
}

const postInitialState = {
    posts: [],
}

export const postReducer = (state = postInitialState, action) => {
    switch (action.type) {
        case "ADD_POST":
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state;
    }
}

export const countReducer = (state = 0, action) => {
    switch (action.type) {
        case "ADD_NUM":
            return state + action.payload;
        default:
            return state;
    }
}

const setUser = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: "TOGGLE_LOADING" });
        const response = await fetch(`https://jsonplaceholder.typicode.com/post/${1}`);
        const data = await response.json();
        dispatch({ type: "TOGGLE_LOADING" });
        dispatch({ type: "SET_USER", payload: { id, name: data.title } });
    }
}

const combinedReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    count: countReducer
});

const store = createStore(combinedReducer, undefined, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log("From Subcription", store.getState()));

console.log(store.dispatch({ type: "ADD_USER", payload: "John" }));
console.log(store.dispatch({ type: "ADD_USER", payload: "Connor" }));
store.dispatch({ type: "ADD_NUM", payload: 15 });
store.dispatch({ type: "SET_USER", payload: "Jack Sparrow" });
// store.dispatch(setUser(1));
// install fetch to run this

```

You're free to take a snoop at the source code and witness the magic for yourself. Sure, I might have taken a completely different approach than the Redux overlords and it might not be as elegant, but that's actually the best part about this!


## License

[MIT](LICENSE)
