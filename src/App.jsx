import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/video/:categoryId/:videoId" element={<Video />}></Route>
      </Routes>
    </div>
  );
};

export default App;
