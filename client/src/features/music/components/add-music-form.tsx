import { useForm } from "react-hook-form";
import FormInput from "../../../components/ui/form-input";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddMusicDTO, addMusicSchema } from "../../../validations/music";
import { getArtist } from "../../../stores/artist/async";
import { useEffect, useState } from "react";
import { addMusic } from "../../../stores/music/async";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/input";

export default function AddMusicForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artists = useAppSelector((state) => state.artist.entities);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMusicDTO>({
    resolver: zodResolver(addMusicSchema),
  });

  const [thumbnailFileName, setThumbnailFileName] = useState<string | null>(
    null
  );
  const [audioFileName, setAudioFileName] = useState<string | null>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setThumbnailFileName(file ? file.name : "No file chosen");
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAudioFileName(file ? file.name : "No file chosen");
  };

  useEffect(() => {
    dispatch(getArtist());
  }, [dispatch]);

  async function onSubmit(data: AddMusicDTO) {
    await dispatch(addMusic(data)).unwrap();
    reset();
    navigate("/");
  }

  return (
    <div className="max-w-3xl p-6 mx-auto shadow-md">
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-white">Add New Music</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Thumbnail File Input */}
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-300">
              Thumbnail Image
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="thumbnail"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-300 focus:ring focus:ring-orange-500 focus:outline-none"
              >
                Choose File
              </label>
              <input
                {...register("thumbnails")}
                id="thumbnail"
                type="file"
                className="hidden"
                onChange={handleThumbnailChange}
              />
              <span className="text-sm text-gray-400">
                {thumbnailFileName || "No file chosen"}
              </span>
            </div>
          </div>

          {/* Audio File Input */}
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-300">
              Music Audio
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="audio"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-300 focus:ring focus:ring-orange-500 focus:outline-none"
              >
                Choose File
              </label>
              <input
                {...register("fileUrl")}
                id="audio"
                type="file"
                className="hidden"
                onChange={handleAudioChange}
              />
              <span className="text-sm text-gray-400">
                {audioFileName || "No file chosen"}
              </span>
            </div>
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Title
          </label>
          <Input
            type="text"
            placeholder="Enter title"
            className="w-full focus:ring-orange-500 focus:border-orange-500"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-600">* {errors.title.message}</p>
          )}
        </div>

        {/* Year Input */}
        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Year
          </label>
          <Input
            type="number"
            placeholder="Enter release year"
            className="w-full focus:ring-orange-500 focus:border-orange-500"
            {...register("year", { valueAsNumber: true })}
          />
          {errors.year && (
            <p className="text-sm text-red-600">* {errors.year.message}</p>
          )}
        </div>

        {/* Artist Select Input */}
        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Select Artist
          </label>
          <select
            {...register("artistId", { valueAsNumber: true })}
            className="w-full px-4 py-2 text-white border border-gray-700 rounded-md bg-zinc-900 focus:ring-orange-500 focus:border-orange-500"
          >
            {artists?.length > 0 ? (
              artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))
            ) : (
              <option value="">No artists available</option>
            )}
          </select>
          {errors.artistId && (
            <p className="text-sm text-red-600">* {errors.artistId.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Add Music
          </button>
        </div>
      </form>
    </div>
  );
}
