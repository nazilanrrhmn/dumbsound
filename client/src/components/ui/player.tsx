import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from "react-icons/fa";

interface PlayerProps {
  fileUrl?: string;
  title?: string;
  artist?: string;
  thumbnail: string;
  onClose: () => void;
}

export default function Player({
  fileUrl,
  title = "Unknown Title",
  artist = "Unknown Artist",
  thumbnail,
  onClose,
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (fileUrl && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current
        .play()
        .catch((err) => console.error("Audio play error:", err));
      setIsPlaying(true);
    }
  }, [fileUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 text-white shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-red-600 transition z-10"
        aria-label="Close player"
      >
        ✕
      </button>

      {/* Thumbnail and Song Info */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
        <img
          src={thumbnail}
          alt="music thumbnail"
          className="w-16 h-16 sm:w-12 sm:h-12 rounded"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-xs sm:text-sm">{title}</p>
          <p className="text-xs text-gray-400 truncate">{artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 w-full mx-4 sm:mx-8">
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={(e) => {
            const time = parseFloat(e.target.value);
            if (audioRef.current) {
              audioRef.current.currentTime = time;
            }
            setCurrentTime(time);
          }}
          className="w-full h-1 bg-gray-500 rounded-full appearance-none accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
        <FaStepBackward
          className="cursor-pointer"
          onClick={() => {
            /* Add backward functionality if needed */
          }}
        />
        {isPlaying ? (
          <FaPause className="cursor-pointer" onClick={togglePlayPause} />
        ) : (
          <FaPlay className="cursor-pointer" onClick={togglePlayPause} />
        )}
        <FaStepForward
          className="cursor-pointer"
          onClick={() => {
            /* Add forward functionality if needed */
          }}
        />
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end mt-4 sm:mt-0">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-gray-500 rounded-full appearance-none accent-orange-500"
        />
      </div>

      <audio
        ref={audioRef}
        src={fileUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
