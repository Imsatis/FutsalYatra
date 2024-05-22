import callApi from '../functions/callApi';
import callApiMultipart from '../functions/callApiMultipart';
export const Add_GROUND = "Add_GROUND";
export const EDIT_GROUND = "EDIT_GROUND";
export const DELETE_GROUND = "DELETE_GROUND";
export const LIST_GROUNDS = "LIST_GROUNDS";
export const GET_GROUND = "GET_GROUND";
export const BOOK_GROUND = "BOOK_GROUND";
export const BOOKING_SLOTS = "BOOKING_SLOTS";
export const ADD_REVIEW = "BOOKING_SLOTS";
export const LIST_REVIEWS = "LIST_REVIEWS";
export const AVG_RATING = "AVG_RATING";

/**
 * Add grounds
 */
export function addGround(values, callback) {
    const request = callApiMultipart(`add-ground`, 'POST', values, callback);
    return {
        type: Add_GROUND,
        payload: request
    };
}

/**
 * Edit grounds
 */
export function editGround(id, values, callback) {
    const request = callApiMultipart(`edit-ground/${id}`, 'PUT', values, callback);
    return {
        type: EDIT_GROUND,
        payload: request
    };
}

/**
 * Edit grounds
 */
export function deleteGround(id, callback) {
    const request = callApiMultipart(`delete-ground/${id}`, 'DELETE', {}, callback);
    return {
        type: DELETE_GROUND,
        payload: request
    };
}

/**
 * List grounds
 */
export function listGrounds(qParams = "", callback) {
    const request = callApi(`list-grounds?${qParams}`, 'GET', {}, callback);
    return {
        type: LIST_GROUNDS,
        payload: request
    };
}

/**
 * Get ground
 */
export function getGround(id, callback) {
    const request = callApi(`get-ground/${id}`, 'GET', {}, callback);
    return {
        type: GET_GROUND,
        payload: request
    };
}


/**
 * Book ground
 */
export function bookGround(values, callback) {
    const request = callApi(`book-ground`, 'POST', values, callback);
    return {
        type: BOOK_GROUND,
        payload: request
    };
}

/**
 * Get slots
 */
export function getBookingSlots(id, callback) {
    const request = callApi(`get-booking-slots/${id}`, 'GET', {}, callback);
    return {
        type: BOOKING_SLOTS,
        payload: request
    };
}

/**
 * Add review
 */
export function addReview(values, callback) {
    const request = callApi(`add-review`, 'POST', values, callback);
    return {
        type: ADD_REVIEW,
        payload: request
    };
}

/**
 * List reviews
 */
export function listReviews(id, callback) {
    const request = callApi(`list-reviews/${id}`, 'GET', {}, callback);
    return {
        type: LIST_REVIEWS,
        payload: request
    };
}

/**
 * Get average rating
 */
export function getAvgRating(id, callback) {
    const request = callApi(`get-avg-rating/${id}`, 'GET', {}, callback);
    return {
        type: AVG_RATING,
        payload: request
    };
}