import { LIST_BOOKINGS, LIST_TRANSACTIONS } from '../actions/BookingAction';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_BOOKINGS:
            var list_bookings = action.payload.data;
            return { ...state, list_bookings };
        case LIST_TRANSACTIONS:
            var list_transactions = action.payload.data;
            return { ...state, list_transactions };
        default:
            return state;
    }
}