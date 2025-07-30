import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState(null);

  return (
    <div>
      <Navbar setSidebar={setSidebar} setSearch={setSearch}></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <Home sidebar={sidebar} search={search} setSearch={setSearch} />
          }
        ></Route>
        <Route
          path="/video/:categoryId/:videoId"
          element={<Video search={search} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
