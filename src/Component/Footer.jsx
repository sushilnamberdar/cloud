import React from "react";
import logoWithName from "../assets/logo-with-name.png";
import twitterIcon from "../assets/twitter.png";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png"; 

const Footer = () => (
  <footer className="border-t border-blue-100 py-6 mt-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoWithName} alt="SnapNest" className="w-32" />
      </div>
      {/* Links */}
      <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-blue-800 font-medium">
        <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
        <a href="/terms" className="hover:underline">Terms of Service</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </div>
      {/* Social Icons */}
      <div className="flex gap-4">
        <a href="https://twitter.com/buntynamberdar" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <div className="rounded-full border border-blue-200 bg-white p-1 hover:border-blue-400 transition">
            <img src={twitterIcon} alt="Twitter" className="w-6 h-6 rounded-full" />
          </div>
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <div className="rounded-full border border-blue-200 bg-white p-1 hover:border-blue-400 transition">
            <img src={facebookIcon} alt="Facebook" className="w-6 h-6 rounded-full" />
          </div>
        </a>
        <a href="https://instagram.com/buntynamberdar" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <div className="rounded-full border border-blue-200 bg-white p-1 hover:border-pink-400 transition">
            <img src={instagramIcon} alt="Instagram" className="w-6 h-6 rounded-full" />
          </div>
        </a>
        <a href="https://github.com/sushilnamberdar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <div className="rounded-full border border-blue-200 bg-white p-1 hover:border-gray-700 transition">
            <img src={githubIcon} alt="GitHub" className="w-6 h-6 rounded-full" />
          </div>
        </a>
        <a href="https://linkedin.com/in/sushilnamberdar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <div className="rounded-full border border-blue-200 bg-white p-1 hover:border-blue-600 transition">
            <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6 rounded-full" />
          </div>
        </a>
      </div>
    </div>
    <div className="text-center text-xs text-blue-700 mt-4 opacity-80">
      &copy; {new Date().getFullYear()} SnapNest. All rights reserved.
    </div>
  </footer>
);

export default Footer;