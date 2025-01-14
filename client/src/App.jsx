import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar bileşenini burada içe aktar
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import VideoConference from "./pages/VideoConference";
import Dashboard from "./pages/Dashboard";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Navbar />
              <SettingsPage />
            </>
          }
        />
        <Route
          path="/coursedetails"
          element={
            <>
              <Navbar />
              <CourseDetailsPage />
            </>
          }
        />
        <Route
          path="/video"
          element={
            <>
              <Navbar />
              <VideoConference />
            </>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
