import { IMusic } from "@/types/music";

export default function MusicCard({ music }: { music: IMusic }) {
  return (
    <div className="p-4 text-white transition rounded-lg bg-zinc-800 hover:bg-zinc-700">
      <img
        src={music.thumbnails}
        alt="thumbnails"
        className="object-cover w-full h-56 mb-2 rounded-lg"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{music?.title}</h3>
        <p className="text-lg text-zinc-400">{music?.year}</p>
      </div>
      <p className="text-md text-zinc-400">{music?.artist?.name}</p>
    </div>
  );
}
