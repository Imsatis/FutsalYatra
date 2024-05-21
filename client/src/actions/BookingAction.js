import callApi from '../functions/callApi';
export const LIST_BOOKINGS = "LIST_BOOKINGS";
export const LIST_TRANSACTIONS = "LIST_TRANSACTIONS";

/**
 * List bookings
 */
export function listBookings(qParams = "", callback) {
    const request = callApi(`list-bookings?${qParams}`, 'GET', {}, callback);
    return {
        type: LIST_BOOKINGS,
        payload: request
    };
}

/**
 * List bookings
 */
export function listTransactions(qParams = "", callback) {
    const request = callApi(`list-transactions?${qParams}`, 'GET', {}, callback);
    return {
        type: LIST_TRANSACTIONS,
        payload: request
    };
}

