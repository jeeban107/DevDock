import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#252746] text-[#dde2fa] py-6 px-10 mt-auto shadow-inner">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[1200px] mx-auto gap-4 text-sm">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} DevDock. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-[#7e4bde] transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#7e4bde] transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-[#7e4bde] transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
