import React, { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState(""); // success | error | ""
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const formData = new FormData(e.target);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-4 sm:p-8 bg-white/70 rounded-xl shadow-lg text-blue-900 flex flex-col md:flex-row gap-8">
      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-4"
      >
        {/* Web3Forms Access Key */}
        <input type="hidden" name="access_key" value="your-access-key" />
        <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
        <label className="font-medium">
          Name
          <input
            type="text"
            name="name"
            required
            className="mt-1 w-full px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label className="font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label className="font-medium">
          Message
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && (
          <div className="text-green-600 font-medium">Message sent successfully!</div>
        )}
        {status === "error" && (
          <div className="text-red-600 font-medium">Failed to send message. Please try again.</div>
        )}
      </form>
      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-2">About SnapNest</h2>
        <p>
          SnapNest is your modern cloud photo storage and sharing app. Organize, relive, and cherish your memories with a beautiful, secure, and easy-to-use platform.
        </p>
        <div className="mt-4">
          <p className="font-semibold">Contact Email:</p>
          <a href="mailto:pubglite33186@gmail.com" className="text-blue-700 underline">
            pubglite33186@gmail.com
          </a>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Follow us:</p>
          <div className="flex gap-3 mt-1">
            <a href="https://twitter.com/buntynamberdar" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Twitter</a>
            <a href="https://instagram.com/buntynamberdar" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">Instagram</a>
            <a href="https://github.com/sushilnamberdar" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;