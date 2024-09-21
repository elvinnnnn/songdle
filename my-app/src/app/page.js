"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import YoutubePlayer from "./components/YoutubePlayer";
import Intro from "./components/Intro";

require("dotenv").config({ path: "songdle/my-app/.env.local" });
// Access environment variables
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

// Encode the client ID and secret for the Authorization header
const auth_token = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export default function Home() {
  const [artist, setArtist] = useState("");
  const [tracks, setTracks] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [page, setPage] = useState("intro");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const prevIndex = () => {
    return currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
  };

  const nextIndex = () => {
    return currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
  };

  const handlePrevClick = () => {
    const newIndex = prevIndex();
    setCurrentTrackIndex(newIndex);
    playTrack(tracks[newIndex]);
  };

  const handleNextClick = () => {
    const newIndex = nextIndex();
    setCurrentTrackIndex(newIndex);
    playTrack(tracks[newIndex]);
  };

  const playAgain = () => {
    setVideoId("");
    setTimeout(() => {
      playTrack(tracks[currentTrackIndex]);
    }, 0);
  };

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handleTracksChange = (tracks) => {
    setTracks(tracks);
  };

  const handleButtonClick = async (artist) => {
    setPage("game");
    const query = artist.replace(/ /g, "+");
    await getTracks(query);
  };

  const handleToIntro = () => {
    setPage("intro");
    setTracks([]);
  };

  const getSpotifyAccessToken = async () => {
    try {
      //make post request to SPOTIFY API for access token, sending relavent info
      const token_url = "https://accounts.spotify.com/api/token";
      const response = await axios.post(
        token_url,
        { grant_type: "client_credentials" },
        {
          headers: {
            Authorization: `Basic ${auth_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  };

  const getTracks = async (artist) => {
    const token = await getSpotifyAccessToken();
    const playlist_res = await axios.get(
      `https://api.spotify.com/v1/search?q=this+is+${artist}&type=playlist&limit=1&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const playlist_id = playlist_res.data.playlists.items[0].id;
    const tracks_res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items%28track%28name,uri%29%29&limit=20&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const tracks = tracks_res.data.items.map((item) => {
      return {
        name: item.track.name,
        uri: item.track.uri,
      };
    });
    console.log(tracks);
    handleTracksChange(tracks);
    playTrack(tracks[0]);
  };

  const playTrack = async (track) => {
    const query = `${artist} ${track.name} audio`;
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyA8F2vcphh6vSflDWsqs3ZP5e7epPh7ioA&q=${query}&type=video&part=snippet&maxResults=1`
    );

    const videoId = res.data.items[0].id.videoId;
    setVideoId(videoId);
  };

  return (
    <div>
      {page == "intro" ? (
        <Intro onButtonClick={handleButtonClick} />
      ) : (
        <div>
          <button onClick={handleToIntro} className="text-5xl font-bold">
            Songdle.
          </button>
          <div>
            {tracks.length > 0 ? (
              <>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}?start=10&end=11&autoplay=1`}
                  allow="autoplay"
                  style={{
                    position: "absolute",
                    width: 0,
                    height: 0,
                    border: 0,
                  }}
                ></iframe>
                <button
                  className="block bg-black hover:bg-neutral-800 w-full p-4 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handlePrevClick}
                >
                  {" "}
                  Prev{" "}
                </button>
                <button
                  className="block bg-black hover:bg-neutral-800 w-full p-4 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleNextClick}
                >
                  {" "}
                  Next{" "}
                </button>
                <button
                  className="block bg-black hover:bg-neutral-800 w-full p-4 text-white font-bold py-2 px-4 rounded-full"
                  onClick={playAgain}
                >
                  {" "}
                  Replay{" "}
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
