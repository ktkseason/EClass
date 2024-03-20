import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    latestSchedule: null,
    courses: [],
    eduBackgrounds: [],
    emotions: [],
    levels: [],
    preps: [],
    schedules: [],
    students: [],
    teachers: [],
    tests: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.status = null;
        },
        setLatestSchedule: (state, action) => {
            state.latestSchedule = action.payload.latestSchedule;
        }
    }
});

export const { setMode, setLogin, setLogout, setLatestSchedule } = authSlice.actions;
export default authSlice.reducer;