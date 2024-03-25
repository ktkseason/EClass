import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Nav from "scenes/global/Nav";
import Footer from "scenes/global/Footer";
import Home from "scenes/home/index";
import About from "scenes/about/index";
import Schedules from "scenes/schedules/index";
import Courses from "scenes/courses/index";
import Teachers from "scenes/teachers/index";
import Contact from "scenes/contact/index";
import Login from "scenes/login/index";
import Profile from "scenes/profile/index";

export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={isAuth ? <Profile /> : <Login />} />
            <Route path="/tests/welcome" element={isAuth ? <TestWelcome /> : <Login />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}