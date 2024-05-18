import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import GroundReducer from './GroundReducer';
import SignReducer from './SignReducer';

const rootReducer = combineReducers({
    form: formReducer,
    grounds: GroundReducer,
    user: SignReducer
});

export default rootReducer;