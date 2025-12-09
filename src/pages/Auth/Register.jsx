// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    try {
      // 1. Firebase create user
      const result = await createUser(email, password);

      // 2. Update Firebase Profile
      await updateUserProfile(name, photo);

      // 3. Create / login user in backend
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

  return (
    <div className="flex justify-center py-10">
      <form
        onSubmit={handleRegister}
        className="border rounded-xl p-6 w-[400px] shadow"
      >
        <h1 className="text-xl font-bold mb-4">Create Account</h1>

        <label className="text-sm">Full Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full mb-3"
          placeholder="John Doe"
          required
        />

        <label className="text-sm">Email</label>
        <input
          type="email"
          name="email"
          className="input input-bordered w-full mb-3"
          placeholder="user@gmail.com"
          required
        />

        <label className="text-sm">Password</label>
        <input
          type="password"
          name="password"
          className="input input-bordered w-full mb-3"
          required
        />

        <label className="text-sm">Photo URL</label>
        <input
          type="text"
          name="photo"
          className="input input-bordered w-full mb-3"
          placeholder="https://photo.jpg"
        />

        <button
          type="submit"
          className="btn btn-primary w-full mb-3"
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <button
          type="button"
          className="btn btn-outline w-full"
          onClick={async () => {
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
          }}
        >
          Continue with Google
        </button>

        <p className="mt-3 text-center text-sm">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
