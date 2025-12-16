import React, { useState, useEffect, useRef, useMemo } from "react";
import "./ChatBot.css";
import RobotIcon from "../../../Logo_Final.ico";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  const messagesEndRef = useRef(null);

  // -----------------------------
  // BASIC INTERNAL DATA
  // -----------------------------
  const services = useMemo(
    () => [
      "Buying",
      "Selling",
      "Renting",
      "Property Management",
      "Commercial Real Estate",
      "Investment Consulting",
      "Market Analysis",
    ],
    []
  );

  const questions = useMemo(
    () => [
      "Hello! I'm the G-1 Realty Group chatbot. What's your name?",
      "Thanks, {name}. What's your email address?",
      `Great. Which of our services are you interested in? Here are the options: ${services.join(
        ", "
      )}`,
      "Got it. Please describe your query or what you need help with.",
      "Thanks! We've received your query and will get back to you shortly.",
    ],
    [services]
  );

  // -----------------------------
  // AUTO-SCROLL CHAT TO BOTTOM
  // -----------------------------
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // -----------------------------
  // CAPTURE IP + SYSTEM DATA
  // -----------------------------
  const collectUserMetadata = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      return {
        ip: data.ip || "Unknown",
        city: data.city || "",
        region: data.region || "",
        country: data.country_name || "",
        isp: data.org || "",
        timezone: data.timezone || "",
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        ip: "Unknown",
        city: "",
        region: "",
        country: "",
        isp: "",
        timezone: "",
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };
    }
  };

  // -----------------------------
  // CHAT OPEN / RESET LOGIC
  // -----------------------------
  const toggleChat = async () => {
    const openWindow = !isOpen;
    setIsOpen(openWindow);

    if (openWindow) {
      const meta = await collectUserMetadata();
      setUserData(meta);
      setMessages([{ text: questions[0], sender: "bot" }]);
      setStep(0);

      // instantly notify backend a new session started
      fetch("/api/chatbot_handler.php?action=session-start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta),
      }).catch(() => {});
    } else {
      setMessages([]);
      setStep(0);
      setUserData({});
    }
  };

  // -----------------------------
  // SEND A MESSAGE
  // -----------------------------
  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();

    if (!text) return;

    // Add user message
    const timestamp = new Date().toISOString();
    setMessages((prev) => [...prev, { text, sender: "user", timestamp }]);

    // Save user message instantly
    fetch("/api/chatbot_handler.php?action=message-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...userData,
        message: text,
        step,
        timestamp,
      }),
    }).catch(() => {});

    // Show "typing…" indicator
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "...", sender: "bot", typing: true },
      ]);
    }, 150);

    // Generate response
    setTimeout(async () => {
      setMessages((prev) => prev.filter((m) => !m.typing));

      let updatedData = { ...userData };
      let botReply = "";
      let nextStep = step + 1;

      if (step === 0) {
        updatedData.name = text;
        botReply = questions[1].replace("{name}", text);
      } else if (step === 1) {
        updatedData.email = text;
        botReply = questions[2];
      } else if (step === 2) {
        const matched =
          services.find((s) => s.toLowerCase() === text.toLowerCase()) || text;
        updatedData.service = matched;
        botReply = questions[3];
      } else if (step === 3) {
        updatedData.query = text;
        botReply = questions[4];

        // SEND FINAL FORM DATA TO BACKEND
        try {
          await fetch("/api/chatbot_handler.php?action=query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          });
        } catch (err) {
          botReply =
            "Sorry, there was an error saving your request. Please try again.";
        }
        nextStep = 4;
      } else {
        botReply =
          "If you need anything else, just type here or choose a service.";
        nextStep = step;
      }

      setUserData(updatedData);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      setStep(nextStep);
    }, 600);

    setInput("");
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window open">
          <div className="chatbot-header">
            <h2>Chat with us</h2>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
                {msg.timestamp && (
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {step < 4 && (
            <form className="chatbot-input" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your message..."
              />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      )}

      <button className="chatbot-icon" onClick={toggleChat}>
        <img src={RobotIcon} alt="Chat" />
      </button>
    </div>
  );
};

export default ChatBot;
