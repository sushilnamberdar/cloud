import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoWithName from "../assets/logo-with-name.png";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (document.cookie.includes("token=")) {
      navigate("/user-media"); // Change this to your actual route for UserUploadedmedia
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400 overflow-hidden">
      {/* Decorative SVG Clouds */}
      <svg className="absolute top-10 left-10 w-40 opacity-40" viewBox="0 0 200 60" fill="none">
        <ellipse cx="60" cy="30" rx="60" ry="30" fill="#fff" />
        <ellipse cx="140" cy="30" rx="40" ry="20" fill="#fff" />
      </svg>
      <svg className="absolute bottom-10 right-10 w-56 opacity-30" viewBox="0 0 250 80" fill="none">
        <ellipse cx="80" cy="40" rx="80" ry="40" fill="#fff" />
        <ellipse cx="180" cy="40" rx="60" ry="30" fill="#fff" />
      </svg>
      {/* Main Card */}
      <div className="relative bg-white/20 backdrop-blur-md rounded-3xl shadow-xl p-10 ml-2 mr-2 flex flex-col items-center max-w-lg w-full">
        <div className=" backdrop:blur-20  rounded-2xl p-2 mb-6 shadow-lg">
          <img src={logoWithName} alt="SnapNest Logo" className="w-48 drop-shadow" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow">Welcome to SnapNest</h1>
        <p className="text-lg text-white/90 mb-8 text-center">
          Your memories, beautifully organized.<br />
          Store, relive, and cherish every moment—just like Google Photos.
        </p>
        <div className="flex gap-4">
          <a href="/login" className="px-6 py-2 rounded-full bg-white text-blue-600 font-semibold shadow hover:bg-blue-100 transition">Login</a>
          <a href="/register" className="px-6 py-2 rounded-full border border-white text-white font-semibold hover:bg-white/20 transition">Register</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;