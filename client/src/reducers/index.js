import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import GroundReducer from './GroundReducer';
import UserReducer from './UserReducer';
import StatsReducer from './StatsReducer';
import BookingReducer from './BookingReducer';

const rootReducer = combineReducers({
    form: formReducer,
    grounds: GroundReducer,
    user: UserReducer,
    stats: StatsReducer,
    bookings: BookingReducer
});

export default rootReducer;