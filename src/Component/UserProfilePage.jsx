import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileIcon from "../assets/user.png";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useUpload } from "../UploadContext";

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { uploadProgress, isUploading } = useUpload();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/media/profile`, {
          withCredentials: true,
        });
        setProfile(res.data);
        if (!res.data.name || !res.data.phone || !res.data.profileImgUrl) {
          setEditMode(true);
          setForm({
            name: res.data.name || "",
            phone: res.data.phone || "",
          });
          setPreview(res.data.profileImgUrl || null);
        }
      } catch {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/media/set-user-details`,
        formData,
        { withCredentials: true }
      );
      setStatus("Profile updated!");
      setProfile(res.data.user);
      setEditMode(false);
      setProfileImage(null);
    } catch (err) {
      setStatus(
        err.response?.data?.error || "Failed to update profile. Try again."
      );
    }
  };

  const getProfileImgUrl = () => {
    if (profile && profile.profileImgUrl) {
      return profile.profileImgUrl.startsWith("http")
        ? profile.profileImgUrl
        : `${API_BASE_URL}${profile.profileImgUrl}`;
    }
    if (preview) return preview;
    return defaultProfileIcon;
  };

  // Logout handler
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-blue-700 text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto mt-24 p-6 bg-white/80 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Set Your Profile Details
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-3"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-blue-200"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-blue-200"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 rounded border border-blue-200"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border border-blue-300 shadow"
            />
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save
          </button>
          {status && <div className="mt-2 text-red-600">{status}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 bg-white/80 rounded-xl shadow-lg flex flex-col items-center">
      <img
        src={getProfileImgUrl()}
        alt="Profile"
        className="w-28 h-28 rounded-full border border-blue-300 shadow mb-4 object-cover"
      />
      {!editMode ? (
        <>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            {profile.name || "No name"}
          </h1>
          <div className="text-blue-800 mb-1">
            <span className="font-semibold">Phone:</span>{" "}
            {profile.phone || "Not provided"}
          </div>
          <div className="text-blue-800 mb-1">
            <span className="font-semibold">Email:</span>{" "}
            {profile.email || "Not provided"}
          </div>
          <div className="mt-4 text-sm text-blue-700 opacity-80">
            Member since:{" "}
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
          <button
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
          <button
            className="mt-4 px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
          {status && <div className="mt-2 text-green-600">{status}</div>}
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-3"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-blue-200"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-blue-200"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 rounded border border-blue-200"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border border-blue-300 shadow"
            />
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save
          </button>
          {status && <div className="mt-2 text-red-600">{status}</div>}
        </form>
      )}
      {isUploading && (
        <div className="w-full mt-4">
          <div className="text-blue-700 font-medium mb-1">
            Uploading: {uploadProgress}%
          </div>
          <div className="w-full bg-blue-100 rounded h-2">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;