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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // [수정] useEffect를 두 개로 분리하여 역할을 명확히 합니다.
  useEffect(() => {
    scrollToBottom();
    Cookies.set(CHAT_COOKIE_KEY, JSON.stringify(messages), {
      expires: 1,
      path: "/",
    });
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

    // [수정] 사용자 메시지와 '입력 중' 상태의 봇 메시지를 한 번에 추가합니다.
    const botTypingMessage = {
      id: `bot-${Date.now()}`,
      text: "입력 중...",
      sender: "bot",
      isTyping: true, // 타이핑 상태임을 표시
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      botTypingMessage,
    ]);
    setNewMessage("");

    try {
      // 1. API를 호출하여 봇의 응답을 가져옵니다.
      const data = await fetchQna({ question: newMessage });

      // 2. '입력 중...' 메시지를 실제 봇의 응답으로 교체합니다.
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botTypingMessage.id
            ? { ...msg, text: data.answer, isTyping: false } // isTyping을 false로 변경
            : msg
        )
      );
    } catch (error) {
      console.error("챗봇 응답을 가져오는 데 실패했습니다.", error);
      // 3. 에러 발생 시 '입력 중...' 메시지를 에러 메시지로 교체합니다.
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botTypingMessage.id
            ? {
                ...msg,
                text: "죄송합니다, 답변을 가져오는 중 오류가 발생했습니다.",
                isTyping: false, // isTyping을 false로 변경
              }
            : msg
        )
      );
    }
  };

  // [추가] 봇이 응답 중인지 확인하는 변수. messages 배열의 마지막 메시지가 '입력 중' 상태인지 확인합니다.
  const isBotReplying = messages[messages.length - 1]?.isTyping === true;

  return (
    <div className="chat-sidebar-container">
      <h3 className="chat-header">AI 경제 챗봇</h3>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            <p
              className={`message-text ${
                message.isTyping ? "typing-indicator" : ""
              }`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {message.text}
            </p>
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
        <button
          type="submit"
          className="send-button"
          disabled={isBotReplying} // [수정] 봇이 응답 중일 때 버튼을 비활성화합니다.
        >
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
