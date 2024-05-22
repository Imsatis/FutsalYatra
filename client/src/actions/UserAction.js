import callApi from '../functions/callApi';
export const USER = "USER";
export const LIST_USERS = "LIST_USERS";
export const CHANGE_ROLE = "CHANGE_ROLE";


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

/**
 * List bookings
 */
export function changeRole(id, callback) {
    const request = callApi(`change-role/${id}`, 'PUT', {}, callback);
    return {
        type: CHANGE_ROLE,
        payload: request
    };
}

