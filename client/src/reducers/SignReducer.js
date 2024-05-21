import { SIGN_IN, SIGN_UP, USER } from '../actions/SignAction';

export default function (state = {}, action) {
    switch (action.type) {
        case SIGN_IN:
            var signin = action.payload.data;
            return { ...state, signin };
        case SIGN_UP:
            var signup = action.payload.data;
            return { ...state, signup };
        default:
            return state;
    }
}