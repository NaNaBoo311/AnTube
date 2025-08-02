import { React, useState } from "react";
import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import SearchFeed from "../../components/search-feed/SearchFeed";
const Home = ({ sidebar, search, setSearch, channels }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      ></Sidebar>

      <div className={`container ${sidebar ? "" : "large-container"}`}>
        {search ? (
          <SearchFeed search={search} setSearch={setSearch} />
        ) : (
          <Feed channels={channels} />
        )}
      </div>
    </>
  );
};

export default Home;
