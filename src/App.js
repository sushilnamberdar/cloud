import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Component/HomePage";
import LoginPage from "./Component/LoginPage";
import RegisterPage from "./Component/RegisterPage";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import About from "./Component/About";
import Contact from "./Component/Contact";
import UserUploadPage from "./Component/UploadPage/UserUploadPage";
import UserProfilePage from "./Component/UserProfilePage";
import UserUploadedmedia from "./Component/Photos/UserUploadedmedia";
import PhotoViewerPage from "./Component/Photos/PhotoViewerPage";
import { UploadProvider } from "./UploadContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UploadProvider>
      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400 overflow-hidden">
        {/* Decorative SVG Clouds */}
        <svg className="absolute top-10 left-10 w-40 opacity-40 pointer-events-none" viewBox="0 0 200 60" fill="none">
          <ellipse cx="60" cy="30" rx="60" ry="30" fill="#fff" />
          <ellipse cx="140" cy="30" rx="40" ry="20" fill="#fff" />
        </svg>
        <svg className="absolute bottom-10 right-10 w-56 opacity-30 pointer-events-none" viewBox="0 0 250 80" fill="none">
          <ellipse cx="80" cy="40" rx="80" ry="40" fill="#fff" />
          <ellipse cx="180" cy="40" rx="60" ry="30" fill="#fff" />
        </svg>
        <Router>
          <Navbar />
          <div className="flex-1 flex flex-col pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/upload" element={<UserUploadPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/user-media" element={<UserUploadedmedia />} />
              <Route path="/user-media/:id" element={<PhotoViewerPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
        <ToastContainer position="top-center" />
      </div>
    </UploadProvider>
  );
}

export default App;
