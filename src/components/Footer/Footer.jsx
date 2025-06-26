import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaLinkedin,
  FaDev,
  FaDeviantart,
} from "react-icons/fa";
import Lottie from "lottie-react";
import cookingAnimation from "../Animations/cooking2.json"; // Make sure this file exists
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-sky-950 text-white py-8 px-4">
      <Fade cascade direction="up">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo + Animation */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-28">
              <Lottie animationData={cookingAnimation} loop={true} />
            </div>
            <h2 className="text-xl font-bold mt-2">🍽️ Recipe Book</h2>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center mt-4 space-y-2 text-shadow-zinc-700">
            <h6 className="footer-title">Company</h6>
            <Link to="/about-us" className="hover:underline text-sm">
              About Us
            </Link>
            <Link to="/contact-us" className="hover:underline text-sm">
              Contact Us
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <h6 className="footer-title mr-0 md:mr-10">Social</h6>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/sadiksourov11/"
                target="_blank"
                className="hover:text-yellow-400 text-2xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/sadiksourov117"
                target="_blank"
                className="hover:text-yellow-400 text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com/in/sadiksourov11"
                target="_blank"
                className="hover:text-yellow-400 text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:sadiksourov11@gmail.com"
                className="hover:text-yellow-400 text-2xl"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Bottom */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Recipe Book. All rights reserved.
          <br />
          <span>
            <FaDev className="inline-block"></FaDev> Developed by Sadik Sourov.{" "}
          </span>
        </div>
      </Fade>
    </footer>
  );
};

export default Footer;
