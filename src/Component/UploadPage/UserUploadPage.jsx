import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { useUpload } from "../../UploadContext";
import { toast } from "react-toastify";

const UserUploadPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const { setUploadProgress, setIsUploading } = useUpload();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setStatus("");
    if (!selected) {
      setFile(null);
      setPreview(null);
      return;
    }
    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(selected.type)) {
      setFile(null);
      setPreview(null);
      setStatus("Unsupported file type. Please select a JPG, PNG, GIF, or WEBP image.");
      return;
    }
    // Optional: Check file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (selected.size > maxSize) {
      setFile(null);
      setPreview(null);
      setStatus("File is too large. Maximum size is 10MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadInBackground = async (selectedFile) => {
    setIsUploading(true);
    setUploadProgress(0);
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("media", selectedFile);

    try {
      await axios.post(
        `${API_BASE_URL}/api/media/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          },
        }
      );
      setStatus("Upload successful!");
      setFile(null);
      setPreview(null);
      setUploadProgress(100);
    } catch (err) {
      setStatus(
        err.response?.data?.error || "Upload failed. Please try again."
      );
      setUploadProgress(0);
    }
    setIsUploading(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      toast.warn("Please select a photo before uploading.");
      return;
    }
    uploadInBackground(file);
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white/80 rounded-xl shadow-lg flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Upload Your Photo</h1>
      <form className="w-full flex flex-col items-center gap-4" onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="block w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg border border-blue-200 shadow mb-2"
          />
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Upload
        </button>
        {status && (
          <div className={`mt-2 text-center font-medium ${status.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {status}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserUploadPage;