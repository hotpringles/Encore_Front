import { Link } from "react-router-dom";

function Nav({ onToggleChatBot }) {
  return (
    <nav className="flex justify-between items-center px-4 h-[60px] bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center">
        <Link
          to="/main"
          className="flex items-center text-gray-800 no-underline font-bold text-2xl font-['Pretendard','Noto_Sans_KR',sans-serif]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            aria-hidden
            className="w-8 h-8 mr-2 text-blue-600"
          >
            <path
              d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
              fill="currentColor"
            />
          </svg>
          <span>FinanceForU</span>
        </Link>
      </div>
      <div>
        <button
          className="w-[45px] h-[45px] flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 hover:text-blue-600 rounded-lg focus:outline-none
          transition-colors no-underline font-['Pretendard','Noto_Sans_KR',sans-serif] border-0 outline-none ring-0 focus-visible:outline-black"
          onClick={onToggleChatBot}
          title="챗봇"
        >
          <span className="material-symbols-outlined text-2xl">
            chat_bubble
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
