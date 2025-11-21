import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/accountApi.js";
import { useUiStore } from "../store/uiStore.js";
import { useNewsStore } from "../store/newsStore.js";
import { useUserStore } from "../store/userStore.js";
import seed from "../assets/seed.png";
import sprout from "../assets/sprout.png";
import tree from "../assets/tree.png";
import forest from "../assets/forest.png";

function Menu() {
  const location = useLocation();
  const menuItems = [
    { path: "/main", label: "Home", icon: "home" },
    { path: "/description", label: "설명", icon: "description" },
  ];

  const { isMenuVisible, toggleMenu, closeMenu } = useUiStore();
  const { user, logOut } = useUserStore();
  const navigate = useNavigate();

  // 링크 클릭 시 동작을 정의하는 새로운 핸들러
  const handleLinkClick = (path) => {
    // 현재 경로와 클릭한 링크의 경로가 같으면 메뉴를 토글
    if (location.pathname === path) {
      toggleMenu();
    } else {
      // 다른 경로로 이동할 때는 메뉴를 닫기만 함
      closeMenu();
    }
  };

  const { newsGroup, setSelectedNewsGroup } = useNewsStore();

  const handleLogout = async () => {
    await logout();
    // localStorage.removeItem("accessToken"); // logout() API 함수에서 이미 처리합니다.
    closeMenu();
    navigate("/login");
    // 로그인 페이지로 이동하는 로직은 App.jsx 등 상위에서 처리하는 것이 더 좋습니다.
  };

  const levelIcons = {
    씨앗: seed,
    새싹: sprout,
    나무: tree,
    숲: forest,
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
            onClick={toggleMenu}
            className="flex items-center p-3 h-[45px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline border-none outline-none focus:border-none focus:outline-none"
            title={isMenuVisible ? "메뉴 접기" : "메뉴 펼치기"}
          >
            <span className="material-symbols-outlined w-[20px] h-[20px] mr-5 text-2xl flex justify-center items-center">
              menu
            </span>
            <span className="font-['Pretendard','Noto_Sans_KR',sans-serif] text-lg font-medium ">
              메뉴
            </span>
          </button>
        </div>
        <ul className="flex flex-col p-[7.5px] space-y-2 whitespace-nowrap">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center p-3 h-[45px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline font-['Pretendard','Noto_Sans_KR',sans-serif]"
                onClick={() => handleLinkClick(item.path)}
              >
                <span className="material-symbols-outlined w-[20px] h-[20px] mr-5 text-2xl flex justify-center items-center">
                  {item.icon}
                </span>
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div
          className={`grow p-4 border-t border-gray-200 whitespace-nowrap transition-opacity duration-300 ease-in-out overflow-y-auto ${
            isMenuVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-sm font-semibold text-gray-500 mb-2 block font-['Pretendard','Noto_Sans_KR',sans-serif]">
            최근 본 뉴스
          </span>
          {/* [수정] 7열 그리드 레이아웃으로 변경 */}
          <ul className="grid grid-cols-1 gap-1 h-[339px] overflow-y-auto">
            {newsGroup.map((reports, index) => (
              <li key={reports[0]?.date || index}>
                <Link
                  to={"/main"}
                  className="flex items-center justify-center p-2 h-[45px] text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline font-['Pretendard','Noto_Sans_KR',sans-serif]"
                  onClick={() => {
                    setSelectedNewsGroup(reports);
                    closeMenu();
                  }}
                  title={reports[0]?.date} // [추가] 날짜에 마우스를 올리면 전체 날짜 표시
                >
                  {/* [수정] 날짜의 '일'만 표시하도록 변경 */}
                  <span className="font-medium w-full">{reports[0]?.date}</span>
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
              src={levelIcons[user.grade]} // [수정] 사용자 프로필 이미지
            />
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 no-underline"
          >
            <span className="material-symbols-outlined mr-4 text-2xl flex justify-center items-center">
              logout
            </span>
            <div className="font-semibold text-base font-['Pretendard','Noto_Sans_KR',sans-serif]">
              로그아웃
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Menu;
