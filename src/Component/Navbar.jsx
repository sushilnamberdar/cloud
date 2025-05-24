import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoWithName from "../assets/logo-with-name.png";
import defaultProfileIcon from "../assets/user.png";
import axios from "axios";
import { API_BASE_URL } from "../api";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(defaultProfileIcon);
  const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.includes("token="));

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(document.cookie.includes("token="));
    window.addEventListener("authChanged", checkAuth);
    return () => window.removeEventListener("authChanged", checkAuth);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoggedIn) {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/media/profile`, {
            withCredentials: true,
          });
          // If profileImgUrl exists, prepend API_BASE_URL if it's a relative path
          let imgUrl = defaultProfileIcon;
          if (res.data.profileImgUrl) {
            imgUrl =
              res.data.profileImgUrl.startsWith("http")
                ? res.data.profileImgUrl
                : `${API_BASE_URL}${res.data.profileImgUrl}`;
          }
          setProfileImg(imgUrl);
        } catch {
          setProfileImg(defaultProfileIcon);
        }
      } else {
        setProfileImg(defaultProfileIcon);
      }
    };
    fetchProfile();
  }, [isLoggedIn]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 border-b border-blue-100 shadow-sm bg-white/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-1">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoWithName} alt="SnapNest" className="w-20" />
        </Link>
        {/* Hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-blue-800 mb-1 transition-all ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-blue-800 mb-1 transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-blue-800 transition-all ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
        {/* Navigation Links */}
        <div className="hidden sm:flex gap-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "text-blue-800 font-medium hover:text-blue-600 transition" +
              (isActive ? " underline" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              "text-blue-800 font-medium hover:text-blue-600 transition" +
              (isActive ? " underline" : "")
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              "text-blue-800 font-medium hover:text-blue-600 transition" +
              (isActive ? " underline" : "")
            }
          >
            Contact
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  "text-blue-800 font-medium hover:text-blue-600 transition" +
                  (isActive ? " underline" : "")
                }
              >
                Upload
              </NavLink>
              {/* Profile Icon */}
              <Link to="/profile" className="ml-2">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-blue-300 shadow-sm object-cover"
                />
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  "px-3 py-1 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm" +
                  (isActive ? " ring-2 ring-blue-300" : "")
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  "px-3 py-1 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition text-sm" +
                  (isActive ? " ring-2 ring-blue-300" : "")
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden rounded-md ml-2 mr-2 border-t border-blue-100 px-4 py-2 flex flex-col gap-2">
          <NavLink
            to="/"
            className="text-blue-800 font-medium hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-blue-800 font-medium hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-blue-800 font-medium hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink
                to="/upload"
                className="text-blue-800 font-medium hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Upload
              </NavLink>
              <Link
                to="/profile"
                className="flex items-center gap-2 mt-2"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-blue-300 shadow-sm object-cover"
                />
                <span className="text-blue-800 font-medium">Profile</span>
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className="px-3 py-1 rounded-full flex items-center justify-center bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1 rounded-full flex items-center justify-center border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;