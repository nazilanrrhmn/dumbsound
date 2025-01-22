import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import MusicCard from "./music-card";
import { useEffect, useState } from "react";
import { getMusic } from "../../stores/music/async";
import Player from "./player";

export default function MusicGallery() {
  const dispatch = useAppDispatch();
  const { entities, loading } = useAppSelector((state) => state.music);
  const musics = entities;

  const defaultMusicState = {
    fileUrl: "",
    title: "",
    artist: "",
    thumbnail: "",
  };

  const [selectedMusic, setSelectedMusic] = useState(defaultMusicState);

  useEffect(() => {
    dispatch(getMusic());
  }, [dispatch]);

  function onClick(music: (typeof musics)[number]) {
    setSelectedMusic({
      fileUrl: music.fileUrl,
      title: music.title,
      artist: music.artist.name,
      thumbnail: music.thumbnails,
    });
  }

  if (loading === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="p-8 bg-zinc-950">
        <h2 className="mb-16 text-3xl font-bold text-center text-orange-500">
          Listen and Feel
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {musics.map((music) => (
            <div key={music.id} onClick={() => onClick(music)}>
              <MusicCard music={music} />
            </div>
          ))}
        </div>
        {selectedMusic.fileUrl && (
          <Player
            fileUrl={selectedMusic.fileUrl}
            title={selectedMusic.title}
            artist={selectedMusic.artist}
            thumbnail={selectedMusic.thumbnail}
            onClose={() => setSelectedMusic(defaultMusicState)}
          />
        )}
      </section>
    </>
  );
}
