import React, { use, useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";


const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Check for token in cookies and redirect if found
    if (document.cookie.includes("token=")) {
      navigate("/");
    }
  }
  , [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        password,
      },{ withCredentials: true });
      setStatus(res.data.message || "Registration successful!");
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } catch (err) {
      setStatus(
        err.response?.data?.error || "Registration failed. Try another email."
      );
    }
  };

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
      <form
        className="relative bg-white/10 rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-sm backdrop-blur-md"
        onSubmit={handleSubmit}
      >
        <div className="bg-white rounded-2xl p-2 mb-4 shadow-lg">
            <Link to="/">
              <img src={logo} alt="SnapNest" className="w-20" />
            </Link>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow">Create your SnapNest account</h2>
        <input
          type="username"
          placeholder="Username"
          required
          className="w-full mb-4 px-4 py-2 rounded bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 px-4 py-2 rounded bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition mb-2"
        >
          Register
        </button>
        {status && (
          <div className="mt-3 text-center text-sm text-blue-800">{status}</div>
        )}
        <p className="text-white mt-4">
          Already have an account?{" "}
          <a href="/login" className="underline text-blue-200 hover:text-white">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;