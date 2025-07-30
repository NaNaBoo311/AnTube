import React from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/vuagi.jpg";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar, setSearch }) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          src={menu_icon}
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
          alt=""
        ></img>
        <Link to="/" onClick={() => setSearch(null)}>
          <img className="logo" src={logo}></img>
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Tìm kiếm"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                setSearch(e.target.value);
              }
            }}
          ></input>
          <img src={search_icon} alt=""></img>
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt=""></img>
        <img src={more_icon} alt=""></img>
        <img src={notification_icon} alt=""></img>
        <img src={profile_icon} className="user-icon" alt=""></img>
      </div>
    </nav>
  );
};

export default Navbar;
