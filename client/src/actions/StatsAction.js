import callApi from '../functions/callApi';
export const STATS_BOX = "STATS_BOX";
export const WEEKLY_BOOKINGS = "WEEKLY_BOOKINGS";
export const WEEKLY_UPCOMING_BOOKINGS = "WEEKLY_UPCOMING_BOOKINGS";
export const WEEKLY_SALES = "WEEKLY_SALES";


/**
 * Get stats
 */
export function statsBox(qParams = "", callback) {
    const request = callApi(`stats-box?${qParams}`, 'GET', {}, callback);
    return {
        type: STATS_BOX,
        payload: request
    };
}

/**
 * Weekly bookings
 */
export function weeklyBookings(qParams = "", callback) {
    const request = callApi(`weekly-bookings?${qParams}`, 'GET', {}, callback);
    return {
        type: WEEKLY_BOOKINGS,
        payload: request
    };
}

/**
 * Weekly upcoming bookings
 */
export function weeklyUpcomingBookings(qParams = "", callback) {
    const request = callApi(`weekly-upcoming-bookings?${qParams}`, 'GET', {}, callback);
    return {
        type: WEEKLY_UPCOMING_BOOKINGS,
        payload: request
    };
}

/**
 * Weekly upcoming bookings
 */
export function weeklySales(qParams = "", callback) {
    const request = callApi(`weekly-sales?${qParams}`, 'GET', {}, callback);
    return {
        type: WEEKLY_SALES,
        payload: request
    };
}

