import { useState } from "react";
import { Link } from "react-router-dom";

function Menu({ location, articles, setSelectedReports, user }) {
  const menuItems = [
    { path: "/main", label: "Home", icon: "home" },
    { path: "/description", label: "설명", icon: "description" },
    { path: "/level-test", label: "테스트", icon: "task" },
  ];

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const onToggleMenu = (path) => {
    if (location.pathname === path) {
      setIsMenuVisible((prev) => !prev);
    } else if (isMenuVisible && location.pathname !== path) {
      setIsMenuVisible((prev) => !prev);
    }
  };
  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <>
      {isMenuVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeMenu}
        />
      )}
      <nav
        className={`fixed top-0 bg-white border-r border-gray-200 overflow-hidden z-50 h-full transition-width duration-300 ease-in-out
          flex flex-col justify-between
          ${isMenuVisible ? "w-[240px]" : "w-[60px]"}`}
      >
        {/* [추가] 메뉴 토글 버튼 */}
        <div className="flex flex-col p-[7.5px] space-y-2 whitespace-nowrap">
          <button
            onClick={() => setIsMenuVisible(!isMenuVisible)}
            className="flex items-center p-3 h-[45px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline"
            title={isMenuVisible ? "메뉴 접기" : "메뉴 펼치기"}
          >
            <span className="material-symbols-outlined mr-4 text-2xl flex justify-center items-center">
              menu
            </span>
            <span className="text-lg font-medium">메뉴</span>
          </button>
        </div>
        <ul className="flex flex-col p-[7.5px] space-y-2 whitespace-nowrap grow">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center p-3 h-[45px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline font-['Pretendard','Noto_Sans_KR',sans-serif]"
                onClick={() => onToggleMenu(item.path)}
              >
                <span className="material-symbols-outlined mr-4 text-2xl flex justify-center items-center">
                  {item.icon}
                </span>
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div
          className={`grow p-4 border-t border-gray-200 whitespace-nowrap transition-opacity duration-300 ease-in-out ${
            isMenuVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-sm font-semibold text-gray-500 mb-2 block font-['Pretendard','Noto_Sans_KR',sans-serif]">
            최근 본 뉴스
          </span>
          <ul className="space-y-1">
            {articles.map((reports) => (
              <li key={reports.id}>
                <Link
                  to={"/main"}
                  className="flex items-center p-3 h-[45px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline font-['Pretendard','Noto_Sans_KR',sans-serif]"
                  onClick={() => {
                    setSelectedReports(reports);
                    closeMenu();
                  }}
                >
                  <span className="material-symbols-outlined mr-4 text-2xl flex justify-center items-center">
                    {reports.date}
                  </span>
                  <span className="text-lg font-medium">
                    {reports.summaries[0].title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`p-4 border-t border-gray-200 whitespace-nowrap transition-opacity duration-300 ease-in-out ${
            isMenuVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to="/profile"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline"
            onClick={closeMenu}
          >
            <img
              alt="프로필"
              className="w-10 h-10 rounded-full mr-3 bg-gray-300"
              src={user?.profileImage || undefined} // [수정] 사용자 프로필 이미지
            />{" "}
            {/* 프로필 이미지 플레이스홀더 */}
            <div className="flex-grow whitespace-nowrap">
              <div className="font-semibold text-base font-['Pretendard','Noto_Sans_KR',sans-serif]">
                {user?.username || "사용자"}
              </div>
              <div className="text-sm text-gray-500 font-['Pretendard','Noto_Sans_KR',sans-serif]">
                프로필 보기
              </div>
            </div>
            <span
              className="material-symbols-outlined text-gray-500 text-2xl"
              aria-hidden
            >
              chevron_right
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Menu;
