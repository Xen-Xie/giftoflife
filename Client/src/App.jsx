import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import FindDonors from "./Pages/FindDonors";
import About from "./Pages/About";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/ErrorPage";
import DashBoard from "./Pages/DashBoard";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/find-donor" element={<FindDonors />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route
            path="/admindashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
