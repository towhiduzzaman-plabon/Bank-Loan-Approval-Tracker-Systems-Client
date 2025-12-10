import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiUserPlus, FiLock, FiMail } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

// Register form submission handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    try {
      // Firebase create user
      const result = await createUser(email, password);

      // Update Firebase Profile
      await updateUserProfile(name, photo);

      // Create / login user in backend
      await axiosPublic.post("/api/auth/jwt", {
        email,
        name,
        photoURL: photo,
      });

      Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Google register handler
  const handleGoogleRegister = async () => {
    try {
      const result = await googleSignIn();

      await axiosPublic.post("/api/auth/jwt", {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
      });

      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-base-200/70 px-4 py-10">
      <div className="w-full max-w-5xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT: Illustration / financial theme */}
        <div className="hidden md:block relative bg-gradient-to-br from-purple-700 via-indigo-600 to-sky-500 text-white">
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 right-0 w-40 h-40 rounded-full bg-yellow-400/30 blur-2xl" />

          <div className="relative h-full p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] mb-3 text-purple-200">
                LoanLink
              </p>
              <h2 className="text-2xl font-bold leading-snug">
                Create your LoanLink
                <br />
                account in minutes.
              </h2>
              <p className="mt-3 text-sm text-gray-100 max-w-sm">
                Join borrowers, managers and admins using LoanLink to manage
                microloans, approvals and repayments in one place.
              </p>
            </div>

            {/* illustrative cards */}
            <div className="mt-8 space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/20"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <FiUserPlus className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-200">New Profiles</p>
                  <p className="text-sm font-semibold">Instant activation</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/20"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <FiLock className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-200">Secure Data</p>
                  <p className="text-sm font-semibold">
                    Protected with JWT & roles
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/20"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-200">Email-based access</p>
                  <p className="text-sm font-semibold">Easy login & tracking</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT: Register Form */}
        <div className="px-6 py-8 md:px-10 md:py-10 flex items-center">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Create an account
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Sign up to start managing microloans with LoanLink.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-base-100"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold mb-1 block">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-base-100"
                  placeholder="user@gmail.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-base-100"
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="text-xs font-semibold mb-1 block">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-base-100"
                  placeholder="https://your-photo-link.jpg"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2 rounded-xl normal-case font-semibold"
                disabled={loading}
              >
                {loading ? "Creating..." : "Register"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google Register Button – same style as Login */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full rounded-xl py-2.5 px-3 text-sm font-medium flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 hover:shadow-md transition"
            >
              {/* Google "G" */}
              <span className="w-5 h-5">
                <svg
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35 16.8 35 11 29.2 11 22S16.8 9 24 9c3.3 0 6.3 1.2 8.6 3.2l5.7-5.7C34.6 3 29.6 1 24 1 12.4 1 3 10.4 3 22s9.4 21 21 21 21-9.4 21-21c0-1.3-.1-2.5-.4-3.7z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.4 15.1 18.7 11 24 11c3.3 0 6.3 1.3 8.6 3.2l5.7-5.7C34.6 3 29.6 1 24 1 16 1 9.2 5.4 6.3 12.1c-.6 1.5-1 3.1-1.2 4.8z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 43c5.3 0 10.2-2 13.8-5.2l-6.4-4.9C29.5 34.3 26.9 35 24 35c-5.2 0-9.5-3.4-11-8.1l-6.6 5C9.3 38.8 16 43 24 43z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.4 5.9l.1-.1 6.4 4.9C37 40.5 42 37 44.7 31.6c.9-1.9 1.3-4.1 1.3-6.6 0-1.3-.1-2.5-.4-3.7z"
                  />
                </svg>
              </span>
              <span>Sign up with Google</span>
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
