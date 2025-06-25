import { useContext, useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";


const Login = () => {
  const { setUser, signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("SignIn successful!!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        toast.error(error.code || "Login failed");
      });
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google SignIn successful!!");
        navigate(location.state?.from?.pathname || "/");
        // console.log(user);
      })
      .catch(() => {
        toast.error("Google SignIn failed!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            <div className="text-right mt-1">
              <Link
                to="/auth/forgetpassword"
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-2 border border-gray-300 dark:border-gray-600 bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#EA4335"
                d="M113 309l-16 61-60 1a257 257 0 010-239h1l53 10 23 53a152 152 0 000 114"
              />
              <path
                fill="#34A853"
                d="M113 309a152 152 0 00218 48l66 52 96-98-32-25-90 9-10-48-64-5a152 152 0 00-218 67"
              />
              <path
                fill="#FBBC05"
                d="M391 133a151 151 0 00-278 88l68 53a94 94 0 01153-46"
              />
              <path
                fill="#4285F4"
                d="M469 209h-17v-1H256v85h122a104 104 0 01-45 68l73 57c43-39 68-96 68-163"
              />
            </svg>
            Login with Google
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
