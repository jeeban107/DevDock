import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import abLogo from "../images/DDLogo.png";
import bgImage from "../images/bg.png";

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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className="collabcard p-8 rounded-xl shadow-lg w-full max-w-sm text-white">
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
        <p className="text-sm text-center mt-4 text-gray-400">
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
