import { combineReducers } from '@reduxjs/toolkit';
import certificateSlice from './certificate/certificateSlice';

export const rootReducer = combineReducers({
  certificate: certificateSlice.reducer,
});
