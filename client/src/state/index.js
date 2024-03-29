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
        },
        setTeachers: (state, action) => {
            state.teachers = action.payload.teachers;
        },
        setCourses: (state, action) => {
            state.courses = action.payload.courses;
        },
        setSchedules: (state, action) => {
            state.schedules = action.payload.schedules;
        },
        setEduBackgrounds: (state, action) => {
            state.eduBackgrounds = action.payload.eduBackgrounds;
        },
        setLevels: (state, action) => {
            state.levels = action.payload.levels;
        }
    }
});

export const { setMode, setLogin, setLogout, setLatestSchedule, setTeachers, setCourses, setSchedules, setEduBackgrounds, setLevels } = authSlice.actions;
export default authSlice.reducer;