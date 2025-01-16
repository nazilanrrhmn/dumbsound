import AddArtistForm from "../../../features/artist/components/add-artist-form";

export default function AddArtist() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="w-full max-w-[1280px] px-6 py-10">
        <p className="my-6 text-2xl font-semibold text-white">Add Artist</p>
        <AddArtistForm />
      </div>
    </div>
  );
}
