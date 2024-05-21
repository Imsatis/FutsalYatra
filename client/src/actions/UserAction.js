import callApi from '../functions/callApi';
export const USER = "USER";
export const LIST_USERS = "LIST_USERS";


export function verify(values, callback) {
    const request = callApi(`verify`, 'GET', values, callback);
    return {
        type: USER,
        payload: request
    };
}

/**
 * List bookings
 */
export function listUsers(qParams = "", callback) {
    const request = callApi(`list-users?${qParams}`, 'GET', {}, callback);
    return {
        type: LIST_USERS,
        payload: request
    };
}

