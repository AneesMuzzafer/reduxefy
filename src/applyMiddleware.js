/**
 * Reduxefy
 *
 * @author    Anees Muzzafer Shah
 *
 * @copyright Anees Muzzafer
 * @link https://github.com/AneesMuzzafer
 *
 */

export const applyMiddleware = (...middlewares) => {
    return (store) => {
        const coreDispatch = store.dispatch;
        const coreGetState = store.getState;
        const coreSubsribe = store.subscribe;

        const enhancedStore = {
            getState: coreGetState,
            dispatch: (actionObject) => {
                let i = -1;
                const next = (actionObject) => {
                    i++;
                    if (i < middlewares.length) {
                        return middlewares[i]({ getState: enhancedStore.getState, dispatch: enhancedStore.dispatch })(next)(actionObject);
                    } else {
                        return coreDispatch(actionObject);
                    }
                }
                return next(actionObject);
            },
            subscribe: coreSubsribe,
        }
        return enhancedStore;
    }
}
