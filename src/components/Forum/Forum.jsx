import React, { useEffect, useRef, useState } from "react";
import useGroupChat from "@hooks/useGroupChat";
import { getUserByEmail } from "@services/userService";
import { ROLECOLORS, MESSAGES_ERROR } from "@config/constants";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import "./Forum.css";

const Forum = ({ Id_Class }) => {
  const { messages, sendMessage } = useGroupChat(Id_Class);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const lastMessageRef = useRef(null); // Referencia para el último mensaje
  const roleColors = ROLECOLORS;
  const clase = {
    id: Id_Class,
  };

  const fetchUser = async () => {
    try {
      const user = await getUserByEmail();
      setUser(user);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Efecto para hacer scroll hacia el último mensaje
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() !== "") {
      const message = {
        sender: user,
        classes: clase,
        content: input,
        send_date: new Date().toISOString(),
      };
      sendMessage(message);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={{ borderRadius: "5px", width: "100%", minHeight:"100vh", paddingBlock:"40px" }}>
      <h3 style={{ marginBlock: "20px", fontSize: "18px" }}>Foro</h3>
      <MessageList messages={messages} lastMessageRef={lastMessageRef} roleColors={roleColors} user={user} />
      <MessageInput handleSend={handleSend} handleKeyDown={handleKeyDown} setInput={setInput} input={input} />
    </div>
  );
};

export default React.memo(Forum);
