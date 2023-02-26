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

const getPost = (id) => {
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
// store.dispatch(getPost(1));
// install fetch to run this
