import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";

const Sidebar = ({ sidebar, category, setCategory }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}channels.json`);
      const data = await res.json();
      setChannels(data.channels);
    };

    fetchChannels();
  }, []);

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        <div
          className={`side-link ${category === 0 ? "active" : ""}`}
          onClick={() => setCategory(0)}
        >
          <img src={home} alt="" /> <p>Home</p>
        </div>

        <hr></hr>
      </div>

      {/* Most watched channels (pretend as subscribed channel) */}
      <div className="subscribed-list">
        <h3>Kênh đăng ký</h3>
        {channels.map((channel, index) => {
          return (
            <div key={index} className="side-link">
              <img src={channel.snippet.thumbnails.default.url} alt="" />{" "}
              <p>{channel.snippet.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
