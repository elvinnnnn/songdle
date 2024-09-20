import React, { useEffect, useRef } from "react";

export default function YoutubePlayer({ videoId }) {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "500",
        width: "900",
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
        },
        playerVars: {
          autoplay: 1,
          controls: 1,
          enablejsapi: 1, // Enable JavaScript API
          origin: window.location.origin, // Set the origin parameter
        },
      });
    };

    // The API will call this function when the video player is ready.
    const onPlayerReady = (event) => {
      event.target.playVideo(); // Auto-play the video
    };

    return () => {
      // Clean up the player instance when the component unmounts
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return <div id="player"></div>;
}
