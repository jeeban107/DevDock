import React from "react";
import { FaUsers, FaCode, FaBolt, FaLaptopCode } from "react-icons/fa";

const SubSection = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Real-Time Collaboration",
      desc: "Work together with your team in real-time. Code simultaneously and see changes live.",
    },
    {
      icon: <FaCode />,
      title: "Multi-language Support",
      desc: "Supports HTML, CSS, JavaScript, Python, Java, C and more.",
    },
    {
      icon: <FaBolt />,
      title: "Instant Execution",
      desc: "Run code with a single click. Get instant results without leaving the editor.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Beginner Friendly",
      desc: "Intuitive and minimal UI designed for learners and professionals alike.",
    },
  ];

  return (
    <section className="w-full bg-[#1e1f38] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-14">
          Why DevDock?
        </h2>
        <div className="grid px-[60px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left relative z-0">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#2b2d4a] border-[#fff] p-6 rounded-2xl shadow-lg relative transition-all duration-300 transform hover:scale-105 hover:z-10 hover:shadow-[0_8px_30px_rgba(50,20,90,0.7)]"
            >
              <div className="text-[#7e4bde] text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#c5b2ff]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubSection;
