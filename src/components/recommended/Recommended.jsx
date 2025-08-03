import React, { useEffect } from "react";
import { useState } from "react";
import "./Recommended.css";
import { Link } from "react-router-dom";
import { value_converter, shuffleArray } from "../../data";

const Recommended = ({ recommendedVideos }) => {
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
