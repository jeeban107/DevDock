import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { MdContentCopy } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { io } from "socket.io-client";
import abLogo from "../images/AboutLogo.png";

// Create socket connection outside component to prevent multiple connections
let socket;

const CollabEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "User";
  const roomId = location.pathname.split("/").pop();

  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState("// Start collaborating now...");
  const [isConnected, setIsConnected] = useState(false);

  const editorRef = useRef(null);
  const codeRef = useRef(code); // Reference to track current code state
  const hasJoinedRef = useRef(false); // Track if we've already joined
  const languageRef = useRef(language); // Track current language state

  // Initialize socket connection
  useEffect(() => {
    // Initialize socket connection only once
    if (!socket) {
      socket = io("http://localhost:3000");
    }

    // Set up socket connection and event handlers
    const setupSocket = () => {
      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Connected to server");

        // Join room after successful connection, but only once
        if (!hasJoinedRef.current) {
          socket.emit("join-room", { roomId, username });
          hasJoinedRef.current = true;
        }
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
        console.log("Disconnected from server");
        hasJoinedRef.current = false;
      });

      // Listen for the user list
      socket.on("user-list", (allUsers) => {
        console.log("Received user list:", allUsers);
        setUsers(allUsers);
      });

      // Handle room full situation
      socket.on("room-full", () => {
        alert(
          "This room is already full (max 4 people). Please try another room."
        );
        navigate("/");
      });

      // Listen for user left
      socket.on("user-left", ({ username }) => {
        console.log("User left event:", username);
        setChatLog((prev) => [
          ...prev,
          { user: "System", msg: `${username} has left the room.` },
        ]);
      });

      // Listen for new chat messages
      socket.on("receive-chat", ({ user, msg }) => {
        setChatLog((prev) => [...prev, { user, msg }]);
      });

      // Listen for code changes from others
      socket.on("receive-code", (newCode) => {
        // Avoid unnecessary updates and prevent loops
        if (newCode !== codeRef.current) {
          codeRef.current = newCode;
          setCode(newCode);

          // Update editor content if editor is mounted
          if (editorRef.current) {
            const model = editorRef.current.getModel();
            if (model && model.getValue() !== newCode) {
              editorRef.current.setValue(newCode);
            }
          }
        }
      });

      // Listen for language changes from others
      socket.on("language-change", (newLanguage) => {
        if (newLanguage !== languageRef.current) {
          languageRef.current = newLanguage;
          setLanguage(newLanguage);
        }
      });
    };

    setupSocket();

    // Connect/join room if socket is already established but only if we haven't joined yet
    if (socket.connected && !hasJoinedRef.current) {
      socket.emit("join-room", { roomId, username });
      hasJoinedRef.current = true;
    }

    // Cleanup function for component unmounting
    return () => {
      console.log("Component unmounting, cleaning up");
      socket.off("user-list");
      socket.off("receive-chat");
      socket.off("receive-code");
      socket.off("room-full");
      socket.off("user-left");
      socket.off("language-change");

      // Leave room when unmounting
      if (socket.connected) {
        console.log(`Leaving room on unmount: ${roomId}, ${username}`);
        socket.emit("leave-room", { roomId, username });
        hasJoinedRef.current = false;
      }
    };
  }, [roomId, username, navigate]);

  // Handle beforeunload event to ensure proper cleanup when page is closed/refreshed
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("Window unloading, leaving room");
      if (socket && socket.connected) {
        socket.emit("leave-room", { roomId, username });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [roomId, username]);

  // Update codeRef when code state changes
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  // Update languageRef when language state changes
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const handleEditorChange = (value) => {
    if (value !== code) {
      codeRef.current = value;
      setCode(value);

      // Only emit if connected to avoid errors
      if (socket && socket.connected) {
        socket.emit("code-change", { roomId, code: value });
      }
    }
  };

  const handleSend = () => {
    if (chatMsg.trim() && socket && socket.connected) {
      socket.emit("send-chat", { roomId, user: username, msg: chatMsg });
      // Add own message to chat log immediately
      setChatLog((prev) => [...prev, { user: username, msg: chatMsg }]);
      setChatMsg("");
    }
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied to clipboard!");
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);

    // Emit language change to all users in the room
    if (socket && socket.connected) {
      socket.emit("language-change", { roomId, language: newLanguage });
    }
  };

  const handleLeave = () => {
    if (socket && socket.connected) {
      console.log(`Leaving room on button click: ${roomId}, ${username}`);
      socket.emit("leave-room", { roomId, username });
      hasJoinedRef.current = false;
    }

    // Navigate back to home page
    navigate("/");

    // Add a slight delay before reloading to ensure navigation completes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="flex h-screen bg-[#1E1E2F] text-white">
      {/* Sidebar */}
      <div className="w-[300px] bg-[#252746] flex flex-col justify-between p-4 shadow-xl">
        <div>
          <div className="flex items-center gap-8 mb-6">
            <div className="flex items-center gap-1">
              <img src={abLogo} alt="Logo" className="h-10" />
              <p className="text-s font-semibold">DevDock</p>
            </div>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-[#2D2F47] text-sm text-white p-2 rounded focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
            </select>
          </div>

          <div className="mb-4">
            <h2 className="text-sm text-gray-400 mb-2">
              Connected {isConnected ? "(online)" : "(offline)"} -{" "}
              {users.length}/4
            </h2>
            {users.map((user, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <div className="bg-pink-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                  {user.username?.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm">{user.username}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#2D2F47] p-3 rounded h-60 overflow-y-auto mb-4">
            {chatLog.map((msg, i) => (
              <p key={i} className="text-sm mb-2">
                <span
                  className={`font-semibold ${
                    msg.user === "System" ? "text-green-400" : "text-[#a37ff1]"
                  }`}
                >
                  {msg.user}:
                </span>{" "}
                {msg.msg}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Send a message..."
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              className="flex-1 bg-[#2D2F47] p-2 rounded text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="text-[#a37ff1] hover:underline text-sm"
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handleCopyRoomId}
            className="bg-[#7e4bde] hover:bg-[#6c3fd3] text-white py-2 rounded flex items-center justify-center gap-2"
          >
            <MdContentCopy />
            Copy ROOM ID
          </button>
          <button
            onClick={handleLeave}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
          >
            <FiLogOut />
            Leave
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CollabEditor;
