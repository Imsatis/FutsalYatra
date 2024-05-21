import callApi from '../functions/callApi';
export const LIST_BOOKINGS = "LIST_BOOKINGS";

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

