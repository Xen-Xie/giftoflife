import { useState } from "react";
import "./App.css";
import Layout from "./Components/layout";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import BecomeDonor from "./Pages/BecomeDonor";
import FindDonor from "./Pages/FindDonor";
import BloodBanks from "./Pages/BloodBanks";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/find-donor" element={<FindDonor />} />
          <Route path="/become-a-donor" element={<BecomeDonor />} />
          <Route path="/blood-banks" element={<BloodBanks />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
