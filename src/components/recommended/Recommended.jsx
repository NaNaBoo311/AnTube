import React, { useEffect } from "react";
import { useState } from "react";
import "./Recommended.css";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";
import { value_converter, shuffleArray } from "../../data";

const Recommended = ({ channels, videoId }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    if (!channels || channels.length === 0) return;

    // ✅ Shuffle channels
    const shuffledChannels = shuffleArray(channels);
    const selectedChannels = shuffledChannels.slice(0, 10);

    let videos = [];

    selectedChannels.forEach((channel) => {
      const uploadsVideos = channel.uploadsVideos || [];

      const shuffledVideos = shuffleArray(uploadsVideos);
      const selectedVideos = shuffledVideos.slice(0, 3);

      videos = videos.concat(selectedVideos);
    });

    setRecommendedVideos(videos);
  }, [videoId]);

  return (
    <div className="recommended">
      {recommendedVideos.map((item, index) => {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId || item.id;

        return (
          <Link
            to={`/video/${videoId}`}
            key={index}
            className="side-video-list"
          >
            <img src={snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{snippet.title}</h4>
              <p>{snippet.channelTitle}</p>
              <p>{value_converter(item.statistics?.viewCount || 0)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
