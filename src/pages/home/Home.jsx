import React from "react";
import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = ({ sidebar }) => {
  return (
    <>
      <Sidebar sidebar={sidebar}></Sidebar>
    </>
  );
};

export default Home;
