import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBot.css";
import { useUserStore } from "../store/userStore"; // [추가] 사용자 정보를 가져오기 위해 import
import { fetchQna } from "../api/qnaApi"; // [추가] qnaApi에서 fetchQna 함수 import

function ChatBot() {
  const user = useUserStore((state) => state.user);
  // [수정] 쿠키 로직을 제거하고, 기본 메시지로 상태를 초기화합니다.
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! 금융에 대해 궁금한 점이 있나요?",
      sender: "bot",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  // [추가] API 호출 로딩 상태를 관리합니다.
  // 이 상태는 '전송' 버튼 비활성화에만 사용됩니다.
  const [isReplying, setIsReplying] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // messages 상태가 변경될 때마다 스크롤을 맨 아래로 이동합니다.

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // [수정] 로딩 상태 시작
    setIsReplying(true);

    // [수정] API 호출과 상태 업데이트에 사용할 메시지 내용을 변수에 저장합니다.
    const questionText = newMessage.trim();

    const userMessage = {
      id: `user-${Date.now()}`, // 화면 표시를 위한 고유 ID
      user: user.id, // API 전송을 위한 사용자 ID
      // [수정] 상태 대신 변수를 사용합니다.
      question: questionText, // API 전송을 위한 질문 내용
      text: questionText, // 화면 표시를 위한 메시지 내용
      sender: "user", // 화면 표시를 위한 발신자 정보
    };

    // [수정] 사용자 메시지와 '입력 중' 상태의 봇 메시지를 한 번에 추가합니다.
    const botTypingMessage = {
      id: `bot-${Date.now()}`,
      text: "입력 중...",
      sender: "bot",
      isTyping: true, // 타이핑 상태임을 표시
    };

    // [수정] 사용자 메시지와 '입력 중' 메시지를 먼저 화면에 즉시 표시합니다.
    setMessages((prevMessages) => [
      ...prevMessages, // [수정] persistMessages 대신 setMessages를 직접 사용합니다.
      userMessage,
      botTypingMessage,
    ]);
    setNewMessage("");

    try {
      // 1. API를 호출하여 봇의 응답을 가져옵니다.
      const data = await fetchQna({ question: questionText });

      // 2. [수정] API 호출이 성공하면, 그 결과를 사용하여 상태를 업데이트합니다.
      //    이때 함수형 업데이트를 사용하여 최신 상태를 보장합니다.
      setMessages((prevMessages) =>
        prevMessages.map(
          (
            msg // [수정] persistMessages 대신 setMessages를 직접 사용합니다.
          ) =>
            msg.id === botTypingMessage.id
              ? { ...msg, text: data.answer, isTyping: false }
              : msg
        )
      );
    } catch (error) {
      console.error("챗봇 응답을 가져오는 데 실패했습니다.", error);
      // 3. [수정] 에러 발생 시에도 동일한 방식으로 상태를 업데이트합니다.
      setMessages((prevMessages) =>
        prevMessages.map(
          (
            msg // [수정] persistMessages 대신 setMessages를 직접 사용합니다.
          ) =>
            msg.id === botTypingMessage.id
              ? {
                  ...msg,
                  text: "죄송합니다, 답변을 가져오는 중 오류가 발생했습니다.",
                  isTyping: false,
                }
              : msg
        )
      );
    } finally {
      // [수정] API 호출이 끝나면 로딩 상태를 해제합니다.
      setIsReplying(false);
    }
  };

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
          disabled={isReplying} // [수정] isReplying 상태로 버튼 비활성화를 제어합니다.
        >
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
