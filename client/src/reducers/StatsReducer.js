import { STATS_BOX, WEEKLY_BOOKINGS, WEEKLY_UPCOMING_BOOKINGS, WEEKLY_SALES} from '../actions/StatsAction';

export default function (state = {}, action) {
    switch (action.type) {
        case STATS_BOX:
            var stats_box = action.payload.data;
            return { ...state, stats_box };
        case WEEKLY_BOOKINGS:
            var weekly_bookings = action.payload.data;
            return { ...state, weekly_bookings };
        case WEEKLY_UPCOMING_BOOKINGS:
            var weekly_upcoming_bookings = action.payload.data;
            return { ...state, weekly_upcoming_bookings };
        case WEEKLY_SALES:
            var weekly_sales = action.payload.data;
            return { ...state, weekly_sales };
        default:
            return state;
    }
}