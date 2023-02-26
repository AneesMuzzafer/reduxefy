/**
 * Reduxefy
 *
 * @author    Anees Muzzafer
 *
 * @copyright Anees Muzzafer
 * @link      https://github.com/AneesMuzzafer
 *
 */

export const createStore = (reducer, initialState, enhancer) => {
    const createCoreStore = (reducer, initialState) => {
        let state = initialState || reducer(undefined, { type: "", payload: "" });
        let subscriptions = [];
        const store = {
            getState: () => {
                return state;
            },
            dispatch: (actionObject) => {
                state = reducer(state, actionObject);
                subscriptions.forEach(sf => {
                    sf();
                });
                return actionObject;
            },
            subscribe: (fn) => {
                subscriptions.push(fn);
                return () => {
                    subscriptions = subscriptions.filter(f => f !== fn);
                };
            }
        }
        return store;
    }

    if (!enhancer) {
        return createCoreStore(reducer, initialState)
    }
    return enhancer(createCoreStore(reducer, initialState))
}
