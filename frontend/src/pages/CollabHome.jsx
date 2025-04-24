import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import abLogo from "../images/DDLogo.png";

const CollabHome = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId && username) {
      navigate(`/collabeditor/${roomId}`, { state: { username } });
    } else {
      alert("Please enter both Room ID and Username.");
    }
  };

  const createNewRoom = () => {
    const id = uuidv4();
    setRoomId(id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://st3.depositphotos.com/4278403/18204/v/600/depositphotos_182047466-stock-video-technology-purple-background-binary-code.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://st3.depositphotos.com/4278403/18204/v/600/depositphotos_182047466-stock-video-technology-purple-background-binary-code.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-10" />

      {/* Foreground card */}
      <div className="collabcard p-8 rounded-xl shadow-lg w-full max-w-sm text-white z-20 backdrop-blur-md bg-white/10 border border-white/20">
        <div className="flex items-center justify-left mb-6">
          <img src={abLogo} alt="Logo" className="h-10 mr-2" />
        </div>
        <label className="block mb-2 text-sm">Paste invitation ROOM ID</label>
        <input
          type="text"
          placeholder="ROOM ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="glass-input mb-4"
        />
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="glass-input mb-4"
        />
        <button
          onClick={handleJoin}
          className="w-full bg-[#7e4bde] hover:bg-[#6a3ec0] py-2 rounded text-white font-semibold"
        >
          Join
        </button>
        <p className="text-sm text-center mt-4 text-gray-300">
          If you don’t have an invite then{" "}
          <span
            onClick={createNewRoom}
            className="text-[#a37ff1] cursor-pointer hover:underline"
          >
            create new room
          </span>
        </p>
      </div>
    </div>
  );
};

export default CollabHome;
