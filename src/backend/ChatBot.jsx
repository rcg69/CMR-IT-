// src/backend/ChatBot.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ChatBot.css";

const getApiBase = () => {
  const fromEnv = process.env.REACT_APP_API_BASE;
  if (fromEnv) return fromEnv;

  if (window.location.hostname === "localhost") return "http://localhost:5000";
  return "https://irah.onrender.com";
};

const API_BASE = getApiBase();
const CHAT_ENDPOINT = `${API_BASE}/api/chatbot/chat`;

const ChatBot = ({
  studentEmail = "anonymous",
  onClose,
  dashboardPath = "/student-dashboard", // ✅ default fallback
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 CMRIT Assistant here. Ask about attendance, timings, or college info!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const goBackOrDashboard = () => {
    // If ChatBot opened as overlay (StudentDashboard passes onClose), use it
    if (typeof onClose === "function") return onClose();

    // If user navigated to /student/chat from within app, history exists
    // location.key === "default" often means first entry / direct load
    const hasHistory = location.key && location.key !== "default";

    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(dashboardPath, { replace: true });
    }
  };

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, studentEmail }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.response || data.message || "No response received",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `⚠️ ${
            err.name === "AbortError" ? "Timeout—try shorter query" : err.message
          }`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="irahChat">
      <header className="irahChat__topbar">
        <button
          className="irahChat__btn irahChat__btn--ghost"
          onClick={goBackOrDashboard}
        >
          ← Back
        </button>

        <div className="irahChat__title">
          <div className="irahChat__titleMain">CMRIT Assistant</div>
          <div className="irahChat__titleSub">Live AI Support</div>
        </div>

        <button
          className="irahChat__btn irahChat__btn--icon"
          onClick={goBackOrDashboard}
          aria-label="Close"
        >
          ✕
        </button>
      </header>

      <main className="irahChat__body">
        <section className="irahChat__scroll">
          <div className="irahChat__thread">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={idx}
                  className={`irahChat__row ${
                    isUser ? "irahChat__row--user" : "irahChat__row--bot"
                  }`}
                >
                  {!isUser && (
                    <img className="irahChat__avatar" src="/ai.jpg" alt="AI" />
                  )}

                  <div
                    className={`irahChat__bubble ${
                      isUser ? "irahChat__bubble--user" : "irahChat__bubble--bot"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="irahChat__row irahChat__row--bot">
                <img className="irahChat__avatar" src="/ai.jpg" alt="AI" />
                <div className="irahChat__bubble irahChat__bubble--bot">
                  <span>Typing</span>{" "}
                  <span className="irahChat__dots">...</span>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>
        </section>

        <footer className="irahChat__composer">
          <input
            className="irahChat__input"
            type="text"
            placeholder="Type your question (e.g., college timings)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
            autoFocus
          />

          <button
            className="irahChat__send"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {loading ? "⏳" : "Send"}
          </button>
        </footer>
      </main>
    </div>
  );
};

export default ChatBot;
