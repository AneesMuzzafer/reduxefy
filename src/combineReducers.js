/**
 * Reduxefy
 *
 * @author    Anees Muzzafer
 *
 * @copyright Anees Muzzafer
 * @link      https://github.com/AneesMuzzafer
 *
 */

export const combineReducers = (reducerObject) => {
    const initialState = {};
    Object.entries(reducerObject).forEach(([key, fn]) => {
        initialState[key] = fn(undefined, { type: "" });
    })

    return (state = initialState, action) => {
        let newState = {};

        Object.entries(reducerObject).forEach(([key, fn]) => {
            newState[key] = fn(state[key], action);
        });

        return newState;
    };
}
