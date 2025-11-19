import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie"; // [추가] js-cookie 라이브러리 import
import "../styles/ChatBot.css";
import { useUserStore } from "../store/userStore"; // [추가] 사용자 정보를 가져오기 위해 import
import { fetchQna } from "../api/qnaApi"; // [추가] qnaApi에서 fetchQna 함수 import

const CHAT_COOKIE_KEY = "chat_messages";

function ChatBot() {
  const user = useUserStore((state) => state.user);
  // [수정] useState의 초기값을 함수로 설정하여, 쿠키에서 데이터를 먼저 읽어오도록 합니다.
  const [messages, setMessages] = useState(() => {
    const savedMessages = Cookies.get(CHAT_COOKIE_KEY);
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (e) {
        console.error("채팅 기록을 파싱하는 데 실패했습니다.", e);
      }
    }
    // 쿠키가 없으면 기본 메시지를 반환합니다.
    return [
      {
        id: 1,
        text: "안녕하세요! 금융에 대해 궁금한 점이 있나요?",
        sender: "bot",
      },
    ];
  });
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); // [추가] 봇이 입력 중인지 상태
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // [수정] useEffect를 두 개로 분리하여 역할을 명확히 합니다.
  useEffect(() => {
    scrollToBottom();
    Cookies.set(CHAT_COOKIE_KEY, JSON.stringify(messages), { expires: 1 });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: `user-${Date.now()}`, // 화면 표시를 위한 고유 ID
      user: user.id, // API 전송을 위한 사용자 ID
      question: newMessage, // API 전송을 위한 질문 내용
      text: newMessage, // 화면 표시를 위한 메시지 내용
      sender: "user", // 화면 표시를 위한 발신자 정보
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]); // 사용자의 메시지를 먼저 화면에 표시
    setNewMessage("");

    setIsTyping(true); // [추가] 입력 중 상태 시작

    // [추가] 여기에 AI 챗봇 API를 호출하는 로직을 구현합니다.
    try {
      // 예시: const response = await fetch('/api/chatbot', { method: 'POST', body: JSON.stringify({ message: newMessage }) });
      const data = await fetchQna({ question: newMessage });

      // 아래는 API 호출을 흉내 낸 가짜 응답입니다.
      const botResponse = {
        id: `bot-${Date.now()}`, // [수정] ID를 더 고유하게 만듭니다.
        text: data.answer, // [수정] 실제 API 응답 데이터를 사용합니다.
        sender: "bot",
      };

      // 봇의 응답을 메시지 목록에 추가합니다.
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("챗봇 응답을 가져오는 데 실패했습니다.", error);
      // 필요하다면 에러 메시지를 UI에 표시할 수 있습니다.
    } finally {
      setIsTyping(false); // [추가] 입력 중 상태 종료
    }
  };

  return (
    <div className="chat-sidebar-container">
      <h3 className="chat-header">AI 경제 챗봇</h3>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            <p className="message-text">{message.text}</p>
          </div>
        ))}
        {/* [추가] 봇이 입력 중일 때 로딩 인디케이터를 표시합니다. */}
        {isTyping && (
          <div className="chat-message bot">
            <p className="message-text typing-indicator">입력 중...</p>
          </div>
        )}
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
        <button type="submit" className="send-button">
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
