"use client";
import React, { useState } from "react";
import axios from "axios";

const SPOTIFY_CLIENT_ID = "5ba334e99fe74fd1b3894003e0e33d5a";
const SPOTIFY_CLIENT_SECRET = "3d53e43f208148059b57ced13b7ea38b";
const auth_token = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

export default function Home() {
  const [artist, setArtist] = useState("");
  const [tracks, setTracks] = useState([]);

  const handleArtistChange = (e) => {
    setArtist(e.target.value.replace(/ /g, "+"));
  };

  const handleTracksChange = (tracks) => {
    setTracks(tracks);
  };

  const handleButtonClick = async () => {
    await getTracks(artist);
    console.log(tracks);
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
      //return access token
      return response.data.access_token;
      //console.log(response.data.access_token);
    } catch (error) {
      //on fail, log the error in console
      console.log(error);
    }
  };

  const getTracks = async (artist) => {
    const token = await getSpotifyAccessToken();
    console.log(token);
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
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items%28track%28name%2Cid%29%29&limit=30&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const tracks = tracks_res.data.items.map((item) => {
      return {
        name: item.track.name,
        id: item.track.id,
      };
    });
    handleTracksChange(tracks);
  };

  return (
    <div>
      <div>Songdle.</div>
      <div>
        <div>
          <input
            placeholder="Artist's Name Here"
            value={artist}
            onChange={handleArtistChange}
          ></input>
          <button onClick={handleButtonClick}>Let's Play!</button>
          <div>
            <ul>
              {tracks.map((track) => (
                <li key={track.id}>{track.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
