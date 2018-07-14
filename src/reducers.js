import { combineReducers } from 'redux';

import admin from 'features/admin/reducer';
import auth from 'features/auth/reducer';


export default combineReducers({
    admin,
    auth,
});
