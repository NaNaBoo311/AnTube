import React, { useState, useEffect } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { value_converter, shuffleArray } from "../../data";

const Feed = ({ channels }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!channels || channels.length === 0) return;

    // ✅ Use passed-in channels — no more fetch
    const shuffledChannels = shuffleArray(channels);
    const selectedChannels = shuffledChannels.slice(0, 10);

    let recommendedVideos = [];

    selectedChannels.forEach((channel) => {
      const uploadsVideos = channel.uploadsVideos || [];

      const shuffledVideos = shuffleArray(uploadsVideos);
      const selectedVideos = shuffledVideos.slice(0, 5);

      recommendedVideos = recommendedVideos.concat(selectedVideos);
    });

    setVideos(recommendedVideos);
  }, [channels]); // ✅ run when channels changes

  return (
    <div className="feed">
      {videos.map((item, index) => {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId || item.id;

        return (
          <Link key={index} to={`/video/${videoId}`} className="card">
            <img src={snippet.thumbnails.medium.url} alt="" />
            <h2>{snippet.title}</h2>
            <h3>{snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics?.viewCount || 0)} views &bull;{" "}
              {moment(snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
