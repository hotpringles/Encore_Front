import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  // 메뉴 전체를 감싸는 nav 태그에 적용할 스타일
  const navStyle = {
    backgroundColor: "#f8f9fa",
    padding: "10px 0",
    borderBottom: "1px solid #dee2e6",
    display: "flex",
    justifyContent: "center",
  };

  // 메뉴 아이템 목록(ul)에 적용할 스타일
  const menuListStyle = {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  };

  // 각 메뉴 아이템(li)에 적용할 스타일

  return (
    <nav style={navStyle}>
      <ul style={menuListStyle}></ul>
    </nav>
  );
}

export default Menu;
