import React from 'react';

const MessageInput = ({ handleSend, handleKeyDown, setInput, input }) => {
    return (
        <div style={{ width: "100%", display: "flex" }}>
        <input
          style={{
            flex: "1",
            borderRadius: "5px",
            padding: "5px",
            paddingLeft: "10px",
            outline: "none",
            border: "1px solid #ccc",
          }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
        />
        <button style={{ width: "80px" }} onClick={handleSend}>
          Enviar
        </button>
      </div>
    );
};

export default React.memo(MessageInput);
