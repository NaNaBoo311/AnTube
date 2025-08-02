import { React, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Video.css";
import PlayVideo from "../../components/playvideo/PlayVideo";
import Recommended from "../../components/recommended/Recommended";
import { API_KEY } from "../../data";
const Video = ({ search, channels }) => {
  const navigate = useNavigate();
  const { videoId } = useParams();

  useEffect(() => {
    if (search !== null) {
      navigate("/"); //Go back to Home
    }
  }, [search, navigate]);

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended videoId={videoId} channels={channels} />
    </div>
  );
};

export default Video;
