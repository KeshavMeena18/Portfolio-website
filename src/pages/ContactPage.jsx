import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "../components/BackgroundBeamsWithCollision";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again later.");
      }
    } catch (error) {
      setStatus("⚠️ Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Back to Homepage */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="text-gray-300 hover:text-white transition font-medium">
          ← Back to Homepage
        </Link>
      </div>

      {/* Background with Beams */}
      <BackgroundBeamsWithCollision className="h-screen bg-gradient-to-b from-[#1e1e1e] to-[#000000]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-lg bg-[#121314]/60 backdrop-blur-3xl rounded-3xl border border-gray-600 shadow-lg p-8 mx-4 sm:mx-auto my-20"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
            <p className="text-gray-400 mt-2">Let’s create something amazing together</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-3xl bg-[#222427] text-white placeholder-gray-400  focus:outline-none focus:ring-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-3xl bg-[#222427] text-white placeholder-gray-400  focus:outline-none focus:ring-2"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-3xl bg-[#222427] text-white placeholder-gray-400  focus:outline-none focus:ring-2"
            />

            {/* Send Message Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#fe723b] text-white font-semibold hover:bg-[#fe723b] transition"
            >
              Send Message
            </motion.button>
          </form>

          {/* Status */}
          {status && <p className="text-center text-gray-300 mt-4">{status}</p>}
        </motion.div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default ContactPage;
