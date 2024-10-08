import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "scenes/global/Topbar";
import LoginPage from "scenes/loginPage";
import Dashboard from "scenes/dashboard";
import Teachers from "scenes/teachers/index";
import EduBackgrounds from "scenes/eduBackgrounds/index";
import Emotions from "scenes/emotions/index";
import Preps from "scenes/preps/index";
import Levels from "scenes/levels/index";
import Tests from "scenes/tests/index";
import Courses from "scenes/courses/index";
import Schedules from "scenes/schedules/index";
import Students from "scenes/students/index";
import Feedbacks from "scenes/feedbacks";
import Pie from "scenes/pie";
import Bar from "scenes/bar";
import Line from "scenes/line";

export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAuth && <Sidebar />}
          <main className="content">
            {isAuth && <Topbar />}
            <Routes>
              <Route path="/" element={isAuth ? <Dashboard /> : <LoginPage />} />
              <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/teachers" element={isAuth ? <Teachers /> : <Navigate to="/" />} />
              <Route path="/courses" element={isAuth ? <Courses /> : <Navigate to="/" />} />
              <Route path="/schedules" element={isAuth ? <Schedules /> : <Navigate to="/" />} />
              <Route path="/students" element={isAuth ? <Students /> : <Navigate to="/" />} />
              <Route path="/feedbacks" element={isAuth ? <Feedbacks /> : <Navigate to="/" />} />
              <Route path="/eduBackgrounds" element={isAuth ? <EduBackgrounds /> : <Navigate to="/" />} />
              <Route path="/emotions" element={isAuth ? <Emotions /> : <Navigate to="/" />} />
              <Route path="/preps" element={isAuth ? <Preps /> : <Navigate to="/" />} />
              <Route path="/levels" element={isAuth ? <Levels /> : <Navigate to="/" />} />
              <Route path="/tests" element={isAuth ? <Tests /> : <Navigate to="/" />} />
              <Route path="/pie" element={isAuth ? <Pie /> : <Navigate to="/" />} />
              <Route path="/bar" element={isAuth ? <Bar /> : <Navigate to="/" />} />
              <Route path="/line" element={isAuth ? <Line /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}