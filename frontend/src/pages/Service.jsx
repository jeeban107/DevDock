import React, { useRef, useState, useEffect } from "react";
import {
  FaCogs,
  FaUserFriends,
  FaLaptopCode,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
  FaComments,
  FaCode,
  FaLanguage,
  FaTabletAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const services = [
  {
    icon: <FaLaptopCode className="text-4xl text-[#7E4BDE]" />,
    title: "Live Code Editor",
    description:
      "Write, edit, and preview code in real-time. Supports HTML, CSS, JavaScript, Python, and more.",
  },
  {
    icon: <FaUserFriends className="text-4xl text-[#7E4BDE]" />,
    title: "Collaboration Room",
    description:
      "Create rooms and collaborate with others instantly. Work together like never before.",
  },
  {
    icon: <FaCogs className="text-4xl text-[#7E4BDE]" />,
    title: "Custom Configurations",
    description:
      "Set your preferences, themes, and layouts for a personalized experience.",
  },
  {
    icon: <FaGlobe className="text-4xl text-[#7E4BDE]" />,
    title: "Cross Platform",
    description:
      "Access DevDock from anywhere. Works seamlessly across all devices.",
  },
  {
    icon: <FaComments className="text-4xl text-[#7E4BDE]" />,
    title: "Real-Time Chat",
    description: "Communicate with team members directly within the workspace.",
  },
  {
    icon: <FaCode className="text-4xl text-[#7E4BDE]" />,
    title: "Code Execution",
    description:
      "Run code in different languages instantly with output on the go.",
  },
  {
    icon: <FaLanguage className="text-4xl text-[#7E4BDE]" />,
    title: "Language Switching",
    description:
      "Switch easily between programming languages within the same session.",
  },
  {
    icon: <FaTabletAlt className="text-4xl text-[#7E4BDE]" />,
    title: "Responsive Layout",
    description:
      "Optimized UI for all screen sizes including mobile and tablets.",
  },
];

const Service = () => {
  const scrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const cardWidth = 284;

    if (container) {
      const newX =
        direction === "left"
          ? Math.max(0, scrollX - cardWidth)
          : Math.min(maxScroll, scrollX + cardWidth);

      container.scrollTo({
        left: newX,
        behavior: "smooth",
      });

      setScrollX(newX);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1f38] text-white px-6 py-20 relative">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white text-3xl hover:text-[#7E4BDE] transition"
      >
        <IoArrowBack />
      </Link>

      <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

        {/* Carousel */}
        <div className="relative">
          {/* Scroll Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-[#2b2d4a] hover:bg-[#3f4273] transition"
          >
            <FaChevronLeft className="text-xl text-[#7E4BDE]" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-[#2b2d4a] hover:bg-[#3f4273] transition"
          >
            <FaChevronRight className="text-xl text-[#7E4BDE]" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4 scroll-smooth hide-scrollbar custom-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="w-[260px] h-[260px] bg-[#2b2d4a] hover:bg-[#3b3e63] rounded-xl p-5 text-center flex flex-col justify-center items-center flex-shrink-0 transition-colors duration-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#c5b2ff]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">More Coming Soon!</h2>
          <p className="text-[#dde2fa]">
            We're constantly working on exciting new features to improve your
            collaborative coding experience. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
