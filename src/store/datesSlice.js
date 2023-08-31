import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step: 1,
    start: '',
    end: '',
    years: 0,
    months: 0,
    days: 0,
};

export const datesSlice = createSlice({
    name: 'cells',
    initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setEnd: (state, action) => {
            state.end = action.payload;
        },
        setYears: (state, action) => {
            state.years = action.payload;
        },
        setMonths: (state, action) => {
            state.months = action.payload;
        },
        setDays: (state, action) => {
            state.days = action.payload;
        },
    },
});

export const {
    setStart,
    setStep,
    setEnd,
    setYears,
    setMonths,
    setDays
} = datesSlice.actions;

export default datesSlice.reducer;
