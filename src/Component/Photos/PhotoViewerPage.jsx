import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { toast } from "react-toastify"; // <-- Add this import

const PhotoViewerPage = () => {
  const { id } = useParams();
  const [mediaList, setMediaList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMediaList = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/media/user`, {
          withCredentials: true,
        });
        setMediaList(res.data.media || []);
      } catch {
        setStatus("Failed to load media.");
      }
      setLoading(false);
    };
    fetchMediaList();
  }, []);

  useEffect(() => {
    if (mediaList.length) {
      const idx = mediaList.findIndex((item) => item._id === id);
      setCurrentIndex(idx);
    }
  }, [mediaList, id]);

  const handleDownload = async () => {
    const media = mediaList[currentIndex];
    if (!media) return;
    const fileUrl = media.url?.startsWith("http")
      ? media.url
      : `${API_BASE_URL}${media.url}`;
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const extMatch = fileUrl.match(/\.\w+$/);
      const ext = extMatch ? extMatch[0] : (/\.(mp4|webm|ogg)$/i.test(fileUrl) ? ".mp4" : ".jpg");
      const filename = (media.caption ? media.caption.replace(/\s+/g, "_") : "download") + ext;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Download started!"); // <-- Add success toast
    } catch {
      setStatus("Failed to download file.");
      toast.error("Failed to download file."); // <-- Add error toast
    }
  };

  const handleDelete = async () => {
    const media = mediaList[currentIndex];
    if (!media) return;
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/media/user/${media._id}`, {
        withCredentials: true,
      });
      setStatus("Deleted successfully!");
      toast.success("Deleted successfully!"); // <-- Add success toast
      setTimeout(() => navigate("/user-media"), 1000);
    } catch {
      setStatus("Failed to delete media.");
      toast.error("Failed to delete media."); // <-- Add error toast
    }
  };

  const goToMedia = (idx) => {
    if (idx >= 0 && idx < mediaList.length) {
      navigate(`/user-media/${mediaList[idx]._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-blue-700 text-lg">Loading...</div>
      </div>
    );
  }

  if (currentIndex === -1 || !mediaList[currentIndex]) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-600 text-lg">{status || "Media not found."}</div>
      </div>
    );
  }

  const media = mediaList[currentIndex];
  const fileUrl = media.url?.startsWith("http")
    ? media.url
    : `${API_BASE_URL}${media.url}`;
  const isVideo = /\.(mp4|webm|ogg)$/i.test(fileUrl);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen  relative"
    >
      {/* Top Back Button */}
      <button
        onClick={() => navigate("/user-media")}
        className="absolute left-4 top-8 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition z-10"
      >
        Back
      </button>
      <div className="max-w-3xl w-full flex flex-col items-center relative">
        {/* Previous Button - left side */}
        <button
          onClick={() => goToMedia(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 rounded-l font-semibold transition z-10 ${
            currentIndex === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          style={{ minWidth: "90px" }}
        >
          Previous
        </button>
        {/* Media */}
        <div className="w-full flex justify-center mb-4">
          {isVideo ? (
            <video src={fileUrl} controls className="w-full max-h-[80vh] rounded bg-black" />
          ) : (
            <img src={fileUrl} alt={media.caption || "Media"} className="w-full max-h-[80vh] object-contain rounded bg-black" />
          )}
        </div>
        {/* Next Button - right side */}
        <button
          onClick={() => goToMedia(currentIndex + 1)}
          disabled={currentIndex === mediaList.length - 1}
          className={`absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 rounded-r font-semibold transition z-10 ${
            currentIndex === mediaList.length - 1
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          style={{ minWidth: "90px" }}
        >
          Next
        </button>
        {/* Download/Delete Buttons */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Download
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
        {status && <div className="text-green-500">{status}</div>}
      </div>
    </div>
  );
};

export default PhotoViewerPage;