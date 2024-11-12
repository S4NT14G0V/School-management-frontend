import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <p><strong>{message.sender}:</strong> {message.content}</p>
                    <p>{new Date(message.send_date).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
