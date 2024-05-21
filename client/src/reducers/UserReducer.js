import { USER, LIST_USERS } from '../actions/UserAction';

export default function (state = {}, action) {
    switch (action.type) {
        case USER:
            var user_details = action.payload ? action.payload.data : {};
            return { ...state, user_details };
        case LIST_USERS:
            var list_users = action.payload ? action.payload.data : {};
            return { ...state, list_users };
        default:
            return state;
    }
}