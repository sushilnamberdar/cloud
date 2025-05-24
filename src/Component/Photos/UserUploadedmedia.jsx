import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api";

const UserUploadedmedia = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/media/user`, {
          withCredentials: true,
        });
        setMedia(res.data.media || []);
      } catch {
        setMedia([]);
      }
      setLoading(false);
    };
    fetchMedia();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-blue-700 text-lg">Loading your photos...</div>
      </div>
    );
  }

  if (!media.length) {
    return (
      <div className="flex flex-col items-center mt-16">
        <div className="text-blue-800 text-lg mb-4">You haven't uploaded any photos yet.</div>
        <Link
          to="/upload"
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Upload Media
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Your Uploaded Photos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {media.map((item) => {
          // Get the file URL
          const fileUrl = item.url?.startsWith("http")
            ? item.url
            : `${API_BASE_URL}${item.url}`;

          // Check if it's a video (simple check for .mp4, .webm, etc.)
          const isVideo = /\.(mp4|webm|ogg)$/i.test(fileUrl);

          return (
            <div key={item._id} className="bg-white rounded-lg shadow p-2 flex flex-col items-center">
              <Link to={`/user-media/${item._id}`} className="block w-full">
                {isVideo ? (
                  <video src={fileUrl} controls className="w-full h-40 object-cover rounded mb-2" />
                ) : (
                  <img src={fileUrl} alt={item.caption || "Uploaded media"} className="w-full h-40 object-cover rounded mb-2" />
                )}
              </Link>
              {item.caption && (
                <div className="text-sm text-blue-800 text-center">{item.caption}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserUploadedmedia;