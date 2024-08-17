import { useState, useRef, useEffect } from "react";
import { api } from "../api";

export const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null) // Ref for scrolling


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavio: "smooth"})
  },[messages])



  const handleSubmit = async (e) => {
    e.preventDefault();

    // set the message to the user input
    setMessages((prevMsg) => [...prevMsg, { role: "user", content: message }]);

    try {
      const response = await api.post("api/chatbot/", { message });

      // Add the bots response to the object
      setMessages((prevMsg) => [
        ...prevMsg,
        { role: "bot", content: response.data.response },
      ]);

      // clear the message
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-display">
        <div className="chat-conversations">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.role === "user" ? "user-chat" : "bot-chat"}
            >
              <strong>{msg.role === "user" ? "You" : "Bot"}: </strong>
              <p>{msg.content}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form action="" onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask AI..."
          />
          <button type="submit" className="chat-search">Search</button>
        </form>
      </div>
    </div>
  );
};
