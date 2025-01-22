import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddArtistDTO, addArtistSchema } from "../../../validations/artist";
import { addArtist } from "../../../stores/artist/async";
import { useAppDispatch } from "../../../hooks/use-store";
import { Input } from "../../../components/ui/input";

export default function AddArtistForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddArtistDTO>({
    resolver: zodResolver(addArtistSchema),
  });

  async function onSubmit(data: AddArtistDTO) {
    await dispatch(addArtist(data));
    reset();
  }

  return (
    <div className="max-w-3xl p-6 mx-auto text-white shadow-md">
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-white">Add New Artist</h2>

        {/* Name Input */}
        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Name
          </label>
          <Input
            type="text"
            placeholder="Enter artist name"
            className="w-full focus:ring-orange-500 focus:border-orange-500"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600">* {errors.name.message}</p>
          )}
        </div>

        {/* Age Input */}
        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Age
          </label>
          <Input
            type="number"
            placeholder="Enter artist age"
            className="w-full focus:ring-orange-500 focus:border-orange-500"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-sm text-red-600">* {errors.age.message}</p>
          )}
        </div>

        {/* Type Select */}
        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Artist Type
          </label>
          <select
            {...register("type")}
            className="w-full px-4 py-2 text-white border border-white rounded-md bg-zinc-900 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="SOLO">Solo</option>
            <option value="DUO">Duo</option>
            <option value="GROUP">Group</option>
          </select>
          {errors.type && (
            <p className="text-sm text-red-600">* {errors.type.message}</p>
          )}
        </div>

        {/* Bio Input */}
        <div>
          <label className="block pb-1 text-sm font-medium text-gray-300">
            Start Career (Bio)
          </label>
          <Input
            type="text"
            placeholder="Enter start career information"
            className="w-full focus:ring-orange-500 focus:border-orange-500"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-sm text-red-600">* {errors.bio.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Add Artist
          </button>
        </div>
      </form>
    </div>
  );
}
