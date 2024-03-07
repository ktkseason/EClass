import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    userStatus: null,
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
            state.status = action.payload.status;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.status = null;
        },
        setCourses: (state, action) => {
            state.courses = action.payload.courses;
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

export const { setMode, setLogin, setLogout, setCourses, setCourse } = authSlice.actions;
export default authSlice.reducer;