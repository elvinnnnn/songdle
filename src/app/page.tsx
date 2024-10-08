"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Waveform, PlayButton, Lives, Unavailable } from "./components";
import Question from "./classes/Question";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

require("dotenv").config({ path: "songdle/my-app/.env.local" });
// Access environment variables
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

// Encode the client ID and secret for the Authorization header
const auth_token = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

interface Item {
  name: string;
}

interface TracksResponse {
  tracks: {
    items: Item[];
  };
}

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tracks, setTracks] = useState<Array<Question>>([]);
  const [videoId, setVideoId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const artist = searchParams.get("artist")?.replace(/ /g, "+") ?? "";

  useEffect(() => {
    if (artist === "") {
      router.push("/intro");
    }
    const fetchTracks = async () => {
      await getTracks(artist);
    };
    fetchTracks();
  }, []);

  const handleTracksChange = (tracks: Array<Question>) => {
    setTracks(tracks);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const allSolved = (tracks: Array<Question>) => {
    return tracks.length > 0 && tracks.every((track) => track.solved);
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
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=artist%3A${query}&type=track&market=AU&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const tracks = (res.data as TracksResponse).tracks.items.map(
      (item: Item) => {
        return new Question(item.name);
      }
    );
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
    <div className="relative">
      <Link
        href="/intro"
        className="title fixed dark:text-white top-0 left-0 text-4xl font-bold"
      >
        Songdle.
      </Link>
      <div className="flex h-screen justify-center items-center">
        <div className="flex items-center justify-center">
          <div className="grid gap-4 grid-rows-4 place-items-center">
            {tracks.length > 0 ? (
              <>
                {tracks.map((track, index) => (
                  <div
                    id={String(index)}
                    key={index}
                    className="flex p-1 engraved"
                  >
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
                <Link
                  href="/intro"
                  className="button block bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 w-full p-4  font-bold py-2 px-4 rounded-full"
                >
                  Let's Play!
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
