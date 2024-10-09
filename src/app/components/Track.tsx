import React from "react";
import PlayButton from "./PlayButton";
import Unavailable from "./Unavailable";
import Waveform from "./Waveform";
import Lives from "./Lives";

interface TrackProps {
  track: any;
  index: number;
  artist: string;
  playTrack: any;
  handleRefresh: any;
  allSolved: any;
}

export default function Track({
  track,
  index,
  artist,
  playTrack,
  handleRefresh,
  allSolved,
}: TrackProps) {
  return (
    <div id={String(index)} key={index} className="flex p-1 engraved">
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
        allSolved={allSolved}
      />
    </div>
  );
}
