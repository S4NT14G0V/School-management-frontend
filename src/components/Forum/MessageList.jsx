import React from 'react';
import { Tag } from "antd";
import { ROLES } from '../../config/constants';

const MessageList = ({ messages, lastMessageRef, roleColors, user }) => {
    return (
        <div
        className="chat-box"
        style={{ borderRadius: "5px", maxHeight: "400px", overflowY: "auto" }}
      >
        {messages.map((msg, index) => {
          const isOwnMessage = msg.sender.email === user?.email; // Verifica si el mensaje es del usuario actual
          return (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              style={{
                display: "flex",
                justifyContent: isOwnMessage ? "flex-end" : "flex-start",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "45%",
                  maxWidth: "60%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: isOwnMessage ? "#d9f1ff" : "#f5f5f5",
                  color: isOwnMessage
                    ? "black"
                    : roleColors[msg.sender.rol?.name] || "black",
                  textAlign: "left",
                  wordWrap: "break-word", // Agregado para ajustar el texto al ancho del contenedor
                  whiteSpace: "pre-wrap", // Agregado para manejar saltos de línea y espacios
                }}
              >
                <strong style={{ width: "fit-content", fontSize: "15px" }}>
                  {msg.sender.name} {msg.sender.lastname}
                </strong>

                <p
                  style={{
                    color: "black",
                    width: "100%",
                    height: "fit-content",
                    whiteSpace: "pre-wrap", // Mantener el texto ajustado con saltos de línea
                    overflowWrap: "break-word", // Forzar ajuste de palabras largas
                    fontSize: "14px",
                  }}
                >
                  {msg.content}
                </p>
                <div style={{width:"100%", display:"flex", justifyContent:`${msg.sender.rol?.name !== ROLES.Student ? "space-between": "end"}`, alignItems:"end", marginTop:"10px"}}>
                  {msg.sender.rol?.name !== ROLES.Student && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#001011",
                        verticalAlign: "end",
                      }}
                    >
                      <Tag color={roleColors[msg.sender.rol?.name]}>{msg.sender.rol?.name.toUpperCase()}</Tag>
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: "12px",
                      display: "block",
                      textAlign: "end",
                      marginTop: "10px",
                      color: "#001010",
                    }}
                  >
                    {new Date(msg.send_date).toLocaleString([], {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
};

export default React.memo(MessageList);
