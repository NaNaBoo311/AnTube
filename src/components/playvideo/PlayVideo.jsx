import React, { useEffect, useRef, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PlayVideo = ({ videoId, nextVideoId }) => {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const currentVideoIdRef = useRef(videoId);

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Update the ref whenever prop changes
  useEffect(() => {
    currentVideoIdRef.current = videoId;
  }, [videoId]);

  const fetchOtherData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

    const [channelRes, commentRes] = await Promise.all([
      fetch(channelData_url).then((r) => r.json()),
      fetch(commentData_url).then((r) => r.json()),
    ]);

    setChannelData(channelRes.items[0]);
    setCommentData(commentRes.items);
  };

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url).then((r) => r.json());
    setApiData(res.items[0]);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]);

  // ✅ Create the ref at the top level
  const nextIdRef = useRef(nextVideoId);

  // ✅ Keep it in sync
  useEffect(() => {
    nextIdRef.current = nextVideoId;
  }, [nextVideoId]);

  useEffect(() => {
    const loadPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        playerVars: { autoplay: 1, rel: 0 },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (nextIdRef.current) {
                navigate(`/video/${nextIdRef.current}`);
              } else {
                console.log("No videos available.");
              }
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        loadPlayer();
      };
    } else {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      loadPlayer();
    }
  }, [videoId, navigate]);

  return (
    <div className="play-video">
      <div id="yt-player"></div>

      <h3>{apiData ? apiData.snippet.title : "No Title"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "No data"}{" "}
          views &bull;{" "}
          {moment(apiData ? apiData.snippet.publishedAt : "No data").fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />{" "}
            {apiData
              ? value_converter(apiData.statistics.likeCount)
              : "No data"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : ""}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : ""}</p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : ""}{" "}
          Comments
        </h4>
        {commentData.map((item, index) => (
          <div key={index} className="comment">
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt=""
            />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName}
                <span>1 day ago</span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay} </p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>
                  {value_converter(
                    item.snippet.topLevelComment.snippet.likeCount
                  )}
                </span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
