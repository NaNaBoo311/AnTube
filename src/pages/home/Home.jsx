import React from "react";
import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
const Home = ({ sidebar }) => {
  return (
    <>
      <Sidebar sidebar={sidebar}></Sidebar>

      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed />
      </div>
    </>
  );
};

export default Home;
