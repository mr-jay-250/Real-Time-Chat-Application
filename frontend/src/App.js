import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const SERVER_URL = 'http://localhost:4000';

function App() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io.connect(SERVER_URL);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('message', (message) => {
            message.from = message.from || 'other';
            setMessages(prevMessages => [...prevMessages, message]);
        });

        newSocket.on('error', (error) => {
            console.error('Socket error:', error);
            alert('An error occurred. Please try again later.');
        });

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
    if (messageInput.trim() !== '') {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessage = { text: messageInput.trim(), from: 'me', time: currentTime };
        socket.emit('message', newMessage, () => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });
        setMessageInput('');
    } else {
        alert('Message cannot be empty. Please enter a message.');
    }
};

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className='main-container'>
            <div className='heading'>
                <div>Multi Chat</div>
                <div className='link-section'>
                    <a 
                        href="https://github.com/mr-jay-250/a-Real-Time-Chat-Application"
                        className='hyper-link'
                        target="_blank" 
                        rel="noreferrer"
                    >
                        PR Link
                    </a>
                </div>
            </div>
            <div className="chat-container">
                {messages.map((message, index) => (
                    <div key={index} className={message.from === socket.id ? 'message-right' : 'message-left'}>
                        <div className="message-text">{message.text}</div>
                        <div className="message-time">{message.time}</div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button 
                    onClick={sendMessage}
                    onKeyPress={handleKeyPress}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
