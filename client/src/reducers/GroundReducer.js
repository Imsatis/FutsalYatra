import { Add_GROUND, LIST_GROUNDS, GET_GROUND, BOOKING_SLOTS, LIST_REVIEWS, AVG_RATING} from '../actions/GroundAction';

export default function (state = {}, action) {
    switch (action.type) {
        case Add_GROUND:
            var addGround = action.payload.data;
            return { ...state, addGround };
        case LIST_GROUNDS:
            var ground_list = action.payload.data;
            return { ...state, ground_list };
        case GET_GROUND:
            var ground_details = action.payload.data;
            return { ...state, ground_details };
        case BOOKING_SLOTS:
            var booking_slots = action.payload.data;
            return { ...state, booking_slots };
        case LIST_REVIEWS:
            var list_reviews = action.payload.data;
            return { ...state, list_reviews };
        case AVG_RATING:
            var avg_rating = action.payload.data;
            return { ...state, avg_rating };
        default:
            return state;
    }
}