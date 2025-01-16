import AddMusicForm from "../../../features/music/components/add-music-form";

export default function AddMusic() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="m-auto max-w-[1280px] px-6 pt-20">
        <p className="my-6 text-2xl font-semibold">Add Music</p>
        <AddMusicForm />
      </div>
    </div>
  );
}
