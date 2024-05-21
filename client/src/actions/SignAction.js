import callApi from '../functions/callApi';
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const USER = "USER";

/**
 * Get activity logs
 */
export function signIn(values, callback) {
    const request = callApi(`sign-in`, 'POST', values, callback);
    return {
        type: SIGN_IN,
        payload: request
    };
}

export function signUp(values, callback) {
    const request = callApi(`sign-up`, 'POST', values, callback);
    return {
        type: SIGN_UP,
        payload: request
    };
}