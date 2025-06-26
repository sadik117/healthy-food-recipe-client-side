import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaLinkedin, FaDev, FaDeviantart } from "react-icons/fa";
import Lottie from "lottie-react";
import cookingAnimation from "../Animations/cooking2.json"; // Make sure this file exists
import { Fade } from "react-awesome-reveal";

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
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Email: support@recipebook.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <a href="https://www.facebook.com/sadiksourov11/" target="_blank" className="hover:text-yellow-400 text-2xl"><FaFacebookF /></a>
            <a href="https://x.com/sadiksourov117" target="_blank" className="hover:text-yellow-400 text-2xl"><FaTwitter /></a>
            <a href="https://linkedin.com/in/sadiksourov11" target="_blank" className="hover:text-yellow-400 text-2xl"><FaLinkedin></FaLinkedin></a>
            <a href="mailto:sadiksourov11@gmail.com" className="hover:text-yellow-400 text-2xl"><FaEnvelope /></a>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Bottom */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Recipe Book. All rights reserved. 
          <br />
        <span><FaDev className="inline-block"></FaDev> Developed by Sadik Sourov. </span> 
        </div>
      </Fade>
    </footer>
  );
};

export default Footer;
