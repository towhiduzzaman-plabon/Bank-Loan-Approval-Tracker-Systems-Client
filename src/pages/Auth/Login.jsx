import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await signIn(email, password);
      const user = result.user;

      // ensure backend JWT + role cookie
      await axiosPublic.post("/api/auth/jwt", {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });

      Swal.fire("Success", "Logged in successfully", "success");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Invalid email or password", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);

      const result = await googleSignIn();
      const user = result.user;

      await axiosPublic.post("/api/auth/jwt", {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });

      Swal.fire("Success", "Logged in with Google", "success");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Google sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Login to access your LoanLink dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full input-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full input-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider text-xs mt-6 mb-4">OR</div>

        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full btn-sm"
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="text-xs text-center mt-4">
          New to LoanLink?{" "}
          <Link to="/register" className="link link-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
