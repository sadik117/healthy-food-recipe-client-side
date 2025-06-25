import { useContext } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Firebase/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Register = () => {
   const { createUser, setUser, userUpdate, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
     
    if (!regExPassword.test(password)) {
      toast.error("Password must be at least 6 characters and include uppercase, lowercase, and a number!");
      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        userUpdate({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            toast.error(errorCode);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };

  const handleGoogleSignIn = () => {
        googleSignIn()
          .then((result) => {
            const user = result.user;
            console.log(user);
            setUser(user);
            navigate(`${ location.state ? location.state : "/" }`);
            toast.success("Google SignIn successful!!");
          })
          .catch(() => {
            toast.error("Google SignIn failed!");
          });
      };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-yellow-100 to-green-100 dark:from-gray-900 dark:to-gray-800">
      
      <Helmet>
        <title>Register</title>
      </Helmet>
      
      <div className="w-full max-w-md p-8 py-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Name</label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <FiUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                required
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Photo URL - */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Photo URL</label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <FiUser className="text-gray-500 mr-2" />
              <input
                type="url"
                name="photo"
                required
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                placeholder="https://your-photo-url.com"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                required
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Confirm Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Registration Button */}
          <button
            type="submit"
            className="w-full bg-green-600 mt-2 md:mt-4 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Register
          </button>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn bg-white w-full mt-1 md:mt-3 text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path fill="#fff" d="M0 0h512v512H0z" />
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </svg>
            Login with Google
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
