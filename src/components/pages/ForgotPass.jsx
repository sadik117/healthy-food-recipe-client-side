import React, { useState, useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const ForgotPass = () => {
  const { forgotPass } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleUpdatePassword = () => {
    if (!email || !password || !confirm) {
      toast.error("Please fill in all fields");
      return;
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!regexPassword.test(password)) {
      toast.error("Password must contain uppercase, lowercase, and a number");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    forgotPass(email, password)
      .then(() => {
        toast.success("Password updated successfully");
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          toast.error("Please log in again to update your password");
        } else {
          toast.error(error.message);
        }
      });
  };

  return (
    <div className="w-80 mt-5 rounded-2xl bg-slate-900 mx-auto justify-center items-center">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>

      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Reset Password</p>

        <input
          className="bg-slate-400 w-full rounded-lg border border-gray-300 px-4 py-3"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="bg-slate-400 w-full rounded-lg border border-gray-300 px-4 py-3"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="bg-slate-400 w-full rounded-lg border border-gray-300 px-4 py-3"
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleUpdatePassword}
          className="mt-4 inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white hover:bg-gray-800 active:scale-95"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ForgotPass;
