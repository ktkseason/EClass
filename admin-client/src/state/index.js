import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
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
        setTeachers: (state, action) => {
            state.teachers = action.payload.teachers;
        },
        setEduBackgrounds: (state, action) => {
            state.eduBackgrounds = action.payload.eduBackgrounds;
        },
        setEmotions: (state, action) => {
            state.emotions = action.payload.emotions;
        },
        setPreps: (state, action) => {
            state.preps = action.payload.preps;
        },
        setLevels: (state, action) => {
            state.levels = action.payload.levels;
        },
        setTests: (state, action) => {
            state.tests = action.payload.tests;
        },
        setCourses: (state, action) => {
            state.courses = action.payload.courses;
        },
        setSchedules: (state, action) => {
            state.schedules = action.payload.schedules;
        },
        setStudents: (state, action) => {
            state.students = action.payload.students;
        },
        setCourse: (state, action) => {
            const updatedCourses = state.courses.map((course) => {
                if (course._id === action.payload.course_id) return action.payload.course;
                return course;
            });
            state.courses = updatedCourses;
        }
    }
});

export const { setMode, setLogin, setLogout, setTeachers, setEduBackgrounds, setEmotions, setPreps, setLevels, setTests, setCourses, setSchedules, setStudents, setCourse } = authSlice.actions;
export default authSlice.reducer;