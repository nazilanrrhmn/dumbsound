import AddMusicForm from "../../../features/music/components/add-music-form";

export default function AddMusic() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="w-full max-w-[1280px] px-6 py-10">
        <AddMusicForm />
      </div>
    </div>
  );
}
