import { configureStore } from '@reduxjs/toolkit';
import datesReducer from './datesSlice';

const store = configureStore({
    reducer: {
        dates: datesReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
