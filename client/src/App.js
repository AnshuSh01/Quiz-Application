import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScoreDashboard from "./pages/ScoreDashboard";
import UserProtectRoutes from "./routes/UserProtectRoutes";
import AdminProtectRoutes from "./routes/AdminProtectRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import AttemptQuiz from "./pages/AttemptQuiz";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserProtectRoutes />}>
          <Route path="user" element={<ScoreDashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminProtectRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/quiz" element={<AttemptQuiz />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </>
  );
}

export default App;
