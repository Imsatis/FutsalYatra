import { LIST_BOOKINGS } from '../actions/BookingAction';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_BOOKINGS:
            var list_bookings = action.payload.data;
            return { ...state, list_bookings };
        default:
            return state;
    }
}