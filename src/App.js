import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Event from "./pages/Event";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import { ScrollToTop } from "./utils/helper";
import Elections from "./pages/Elections";
import Council from "./pages/Members";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Event />} />
        <Route path="/council" element={<Council />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
