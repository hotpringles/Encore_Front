import React, { useState, useEffect, useRef } from 'react';
import './ChatSidebar.css';

function ChatSidebar() {
    const [messages, setMessages] = useState([
        { id: 1, text: '안녕하세요! 금융에 대해 궁금한 점이 있나요?', sender: 'bot' },
        { id: 2, text: '네, 최근 주식 시장 동향에 대해 알려주세요.', sender: 'user' },
        { id: 3, text: '최근 주식 시장은 변동성이 큰 모습을 보이고 있습니다. 특히 기술주 중심으로 조정이 있었습니다.', sender: 'bot' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const userMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
        };

        setMessages([...messages, userMessage]);
        setNewMessage('');
    };

    return (
        <div className="chat-sidebar-container">
            <h3 className="chat-header">AI 경제 챗봇</h3>
            <div className="chat-messages">
                {messages.map(message => (
                    <div key={message.id} className={`chat-message ${message.sender}`}>
                        <p className="message-text">{message.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="chat-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                />
                <button type="submit" className="send-button">전송</button>
            </form>
        </div>
    );
}

export default ChatSidebar;