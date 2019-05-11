import { combineReducers } from 'redux';
import memberReducer from './memberReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  member: memberReducer,
  error: errorReducer,
  auth: authReducer
});
 