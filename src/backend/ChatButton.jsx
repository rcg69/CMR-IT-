// src/backend/ChatButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // If parent passed an onClick (like opening modal), use it
    if (typeof onClick === "function") return onClick();

    // Otherwise fallback to navigation
    navigate("/student/chat");
  };

  return (
    <button
      type="button"
      className="chat-btn"
      onClick={handleClick}
      aria-label="Chat with Assistant"
    >
      Chat with Assistant
    </button>
  );
};

export default ChatButton;
