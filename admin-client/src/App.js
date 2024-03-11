import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage";
import Dashboard from "scenes/dashboard";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "scenes/global/Topbar";


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
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}