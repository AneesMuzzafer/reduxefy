/**
 * Reduxefy
 *
 * @author    Anees Muzzafer
 *
 * @copyright Anees Muzzafer
 * @link      https://github.com/AneesMuzzafer
 *
 */

export const thunkMiddleware = (store) => {
    return (next) => {
        return (action) => {
            if (typeof action === "function") {
                return action(store.dispatch, store.getState)
            } else {
                return next(action);
            }
        }
    }
}
