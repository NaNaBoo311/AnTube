import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState(null);
  const [channels, setChannels] = useState([]);
  const [suffleChannels, setSuffleChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}channels.json`);
      const json = await res.json();
      setChannels(json.channels);
    };
    fetchChannels();
  }, []);

  return (
    <div>
      <Navbar setSidebar={setSidebar} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sidebar={sidebar}
              search={search}
              setSearch={setSearch}
              channels={channels} // ✅ pass channels down
            />
          }
        />
        <Route
          path="/video/:videoId"
          element={<Video search={search} channels={channels} />}
        />
      </Routes>
    </div>
  );
};

export default App;
