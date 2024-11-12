import React, { useEffect, useState } from "react";
import useGroupChat from "../../hooks/useGroupChat";
import "./Forum.css";
import { useUser } from "../../context/userContext";
import { getUserByEmail } from "../../services/userService";

const Forum = ({Id_Class}) => {
  const { messages, sendMessage } = useGroupChat();
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(""); // Nuevo: Nombre del usuario
  const { authToken } = useUser();
  const [user, setUser] = useState(null);

  const clase = {
    id: Id_Class,
  };
  
  const fetchUser = async () => {
    try {
      const user = await getUserByEmail(authToken);
      setUser(user);
    } catch (error) {
      console.error("Error fetching user data: " + error.message);
    }
  };
  
  useEffect(() => {
    if (authToken) {
      const user = fetchUser(authToken)
      setUser(user);
    }
  }, [authToken]);

  const handleSend = () => {
    if (username.trim() !== "") {
      const message = {
        sender: user,
        classes: clase,
        content: input,
        send_date: new Date().toISOString(),
      };
      sendMessage(message);
      setInput("");
    } else {
      alert("Por favor, ingrese un nombre de usuario");
    }
  };

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.name} {msg.sender.lastname}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Escribe tu nombre..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default Forum;
