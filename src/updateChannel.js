// scripts/updateChannels.js

import fs from "fs/promises";
import fetch from "node-fetch"; // if using Node < 18
import { API_KEY } from "./data.js";
const OUTPUT_FILE = "./public/channels.json";

const channels = [
  "BANGTANTV",
  "HYBE LABELS",
  "ILLIT",
  "JENNIE",
  "LE SSERAFIM",
  "M2",
  "NewJeans",
  "Mnet K-POP",
  "SEVENTEEN",
  "Vie Channel - MUSIC",
];

// 1️⃣ Search for each channel to get its metadata (ID, title, snippet)
// Search (list by keyword)
const searchChannels = async () => {
  const responses = await Promise.all(
    channels.map((channelName) =>
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(
          channelName
        )}&key=${API_KEY}`
      ).then((res) => res.json())
    )
  );

  const found = responses.flatMap((r) => r.items || []);
  return found;
};

// 2️⃣ For each channel ID, get the uploads playlist ID
const getUploadsPlaylistId = async (channelId) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null;
};

// 3️⃣ For each playlist, get up to 50 videos (max allowed per call)
const getVideosFromPlaylist = async (playlistId) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items || [];
};

// 4️⃣ Combine all steps
const fetchAll = async () => {
  const channelSearchResults = await searchChannels();

  const detailedChannels = await Promise.all(
    channelSearchResults.map(async (channel) => {
      const channelId = channel.snippet.channelId;

      const uploadsPlaylistId = await getUploadsPlaylistId(channelId);
      let uploadsVideos = [];

      if (uploadsPlaylistId) {
        uploadsVideos = await getVideosFromPlaylist(uploadsPlaylistId);
      }

      return {
        snippet: channel.snippet,
        channelId,
        uploadsPlaylistId,
        uploadsVideos,
      };
    })
  );

  return {
    generatedAt: new Date().toISOString(),
    channels: detailedChannels,
  };
};

// 5️⃣ Run + save to file
const run = async () => {
  const data = await fetchAll();
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`✅ Channels data with playlists saved to ${OUTPUT_FILE}`);
};

run();
