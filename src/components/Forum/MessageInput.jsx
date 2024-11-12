import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
    const [content, setContent] = useState('');

    const handleSend = () => {
        if (content.trim()) {
            sendMessage(content);
            setContent('');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Escribe un mensaje..."
            />
            <button onClick={handleSend}>Enviar</button>
        </div>
    );
};

export default MessageInput;
