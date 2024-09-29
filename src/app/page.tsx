"use client";
import React, { useState } from "react";
import axios from "axios";
import Intro from "./components/Intro";
import Waveform from "./components/Waveform";
import PlayButton from "./components/PlayButton";
import Lives from "./components/Lives";
import Question from "./classes/Question";
import Unavailable from "./components/Unavailable";

require("dotenv").config({ path: "songdle/my-app/.env.local" });
// Access environment variables
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

// Encode the client ID and secret for the Authorization header
const auth_token = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

interface Item {
  track: {
    name: string;
  };
}

export default function Home() {
  const [tracks, setTracks] = useState<Array<Question>>([]);
  const [videoId, setVideoId] = useState("");
  const [page, setPage] = useState("intro");
  const [artist, setArtist] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleTracksChange = (tracks: Array<Question>) => {
    setTracks(tracks);
  };

  const handleButtonClick = async (artist: string) => {
    setPage("game");
    setArtist(artist);
    const query = artist.replace(/ /g, "+");
    await getTracks(query);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const allSolved = (tracks: Array<Question>) => {
    return tracks.length > 0 && tracks.every((track) => track.solved);
  };

  const playAgain = () => {
    window.location.reload();
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

  const getTracks = async (query: string) => {
    const token = await getSpotifyAccessToken();
    const playlist_res = await axios.get(
      `https://api.spotify.com/v1/search?q=this+is+${query}&type=playlist&limit=1&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const playlist_id = playlist_res.data.playlists.items[0].id;
    const tracks_res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items%28track%28name%29%29&limit=10&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const tracks = tracks_res.data.items.map((item: Item) => {
      return new Question(item.track.name);
    });
    handleTracksChange(tracks);
  };

  const playTrack = async (
    question: Question,
    index: number,
    artist: string
  ) => {
    try {
      const track = tracks[index];
      const query = `${artist} ${track.name} audio`;
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyA8F2vcphh6vSflDWsqs3ZP5e7epPh7ioA&q=${query}&type=video&part=snippet&maxResults=1`
      );

      if (res.data.items.length > 0) {
        const videoId = res.data.items[0].id.videoId;
        setVideoId("");
        setTimeout(() => {
          setVideoId(videoId);
        }, 100);
        question.removeLife();
      } else {
        console.error("No video found for the query:", query);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div>
      {page == "intro" ? (
        <Intro onButtonClick={handleButtonClick} />
      ) : (
        <div className="relative">
          <button
            onClick={playAgain}
            className="fixed top-0 left-0 text-4xl font-bold"
          >
            Songdle.
          </button>
          <div className="flex h-screen justify-center items-center">
            <div className="flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow min-w-[515px] w-auto h-auto p-4">
              <div className="grid gap-4 grid-rows-4 place-items-center">
                {tracks.length > 0 ? (
                  <>
                    {tracks.map((track, index) => (
                      <div id={String(index)} key={index} className="flex p-1">
                        {track.alive ? (
                          <button
                            onClick={() => playTrack(track, index, artist)}
                            className="pr-1"
                          >
                            <PlayButton solved={track.solved} />
                          </button>
                        ) : (
                          <button disabled className="pr-1">
                            <Unavailable solved={track.solved} />
                          </button>
                        )}
                        <Lives lives={track.lives} solved={track.solved} />
                        <Waveform
                          question={track}
                          handleRefresh={handleRefresh}
                          allSolved={() => allSolved(tracks)}
                        />
                      </div>
                    ))}
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
                  </>
                ) : null}
                {allSolved(tracks) ? (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={playAgain}
                      className="block bg-black hover:bg-neutral-800 w-full p-4 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Play Again
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
