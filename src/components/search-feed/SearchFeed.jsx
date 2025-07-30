import React, { useEffect } from "react";
import { useState } from "react";
import "./SearchFeed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import vuagi from "../../assets/vuagi.jpg";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";
import { Link } from "react-router-dom";
const SearchFeed = ({ search, setSearch }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const searchVideo_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search.replaceAll(
      " ",
      "%20"
    )}&key=${API_KEY}`;
    const res = await fetch(searchVideo_url);
    const data = await res.json();
    setApiData(data.items);
  };
  // Main api data
  useEffect(() => {
    fetchData();
    console.log("HERE", apiData);
  }, [search]);

  return (
    <div className="search-feed">
      {apiData.map((item, index) => {
        return (
          <Link
            to={`/video/1/${item.id.videoId}`}
            className="search-video-list"
            onClick={() => setSearch(null)}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="search-video-info">
              <h4>{item.snippet.title}</h4>
              <p>100K views &bull; 2 days ago</p>
              <div className="channel-name-img">
                <img src="" alt="" />
                <span>{item.snippet.channelTitle}</span>
              </div>
              <p>{item.snippet.description.slice(0, 129) + "..."}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchFeed;
