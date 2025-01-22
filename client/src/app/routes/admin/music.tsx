import ListMusic from "../../../features/music/components/list-music";

export default function Music() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="m-auto max-w-[1280px] px-6 pt-6 text-white">
        <p className="my-6 text-2xl font-semibold">List Music</p>
        <ListMusic />
      </div>
    </div>
  );
}
