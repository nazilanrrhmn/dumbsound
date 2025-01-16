import { useForm } from "react-hook-form";
import FormInput from "../../../components/ui/form-input";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddMusicDTO, addMusicSchema } from "../../../validations/music";
import { getArtist } from "../../../stores/artist/async";
import { useEffect } from "react";
import { addMusic } from "../../../stores/music/async";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    dispatch(getArtist());
  }, [dispatch]);

  async function onSubmit(data: AddMusicDTO) {
    await dispatch(addMusic(data)).unwrap();
    reset();
    navigate("/");
  }

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-300">
              Thumbnail Image
            </label>
            <input
              {...register("thumbnails")}
              type="file"
              className="border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-300">
              Music Audio
            </label>
            <input
              {...register("fileUrl")}
              type="file"
              className="border rounded-lg p-2"
            />
          </div>
        </div>

        <FormInput placeholder="Title" {...register("title")} />
        {errors.title && (
          <p className="text-red-600">* {errors.title.message}</p>
        )}

        <FormInput
          placeholder="Year"
          type="number"
          {...register("year", { valueAsNumber: true })}
        />
        {errors.year && <p className="text-red-600">* {errors.year.message}</p>}

        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Select Artist
          </label>
          <select
            {...register("artistId", { valueAsNumber: true })}
            className="h-12 w-full rounded-lg border px-4"
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
            <p className="text-red-600">* {errors.artistId.message}</p>
          )}
        </div>

        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            Add Music
          </button>
        </div>
      </form>
    </div>
  );
}
