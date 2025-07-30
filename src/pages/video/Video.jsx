import { React, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Video.css";
import PlayVideo from "../../components/playvideo/PlayVideo";
import Recommended from "../../components/recommended/Recommended";
import { API_KEY } from "../../data";
const Video = ({ search }) => {
  const navigate = useNavigate();
  const { videoId, categoryId } = useParams();

  const [cateId, setCateId] = useState(0);

  const fetchVideoData = async () => {
    //Fetching Videos Data (Video)
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setCateId(data.items[0].snippet.categoryId));
  };

  useEffect(() => {
    fetchVideoData(); //get its category
  }, [videoId]);

  useEffect(() => {
    if (search !== null) {
      navigate("/"); //Go back to Home
    }
  }, [search, navigate]);

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
