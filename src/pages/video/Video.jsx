import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Video.css";
import PlayVideo from "../../components/playvideo/PlayVideo";
import Recommended from "../../components/recommended/Recommended";
import { shuffleArray } from "../../data";
import { API_KEY } from "../../data";

const Video = ({ search, channels }) => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [nextVideoId, setNextVideoId] = useState(null);

  useEffect(() => {
    if (search !== null) {
      navigate("/"); //Go back to Home
    }
  }, [search, navigate]);

  // Random recommended videos
  useEffect(() => {
    if (!channels || channels.length === 0) return;

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

    const nextVideo = videos[0];

    const nextId = nextVideo
      ? nextVideo.snippet?.resourceId?.videoId || nextVideo.id
      : null;

    setNextVideoId(nextId);
  }, [videoId, channels]);

  const fetchRelatedVideos = async (videoId) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=dQw4w9WgXcQ&maxResults=5&key=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchRelatedVideos("XEnsWl8bRWE");
  }, []);

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} nextVideoId={nextVideoId} />
      <Recommended recommendedVideos={recommendedVideos} />
    </div>
  );
};

export default Video;
