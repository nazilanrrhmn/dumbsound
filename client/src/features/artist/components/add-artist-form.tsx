import { useDispatch } from "react-redux";
import FormInput from "../../../components/ui/form-input";
import { useForm } from "react-hook-form";
import { AddArtistDTO, addArtistSchema } from "../../../validations/artist";
import { zodResolver } from "@hookform/resolvers/zod";
import { addArtist } from "../../../stores/artist/async";
import { useAppDispatch } from "../../../hooks/use-store";

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
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput {...register("name")} type="text" placeholder="Name" />
        {errors.name && (
          <p className="text-rose-600">* {errors.name.message}</p>
        )}
        <FormInput {...register("age")} type="number" placeholder="Age" />
        {errors.age && <p className="text-rose-600">* {errors.age.message}</p>}
        <div>
          <select
            {...register("type")}
            className="border-border-primary bg-background-teritery h-12 w-full rounded-lg border-[1px] px-4"
          >
            <option value="SOLO">Solo</option>
            <option value="DUO">Duo</option>
            <option value="GROUP">Group</option>
          </select>
        </div>
        {errors.type && (
          <p className="text-rose-600">* {errors.type.message}</p>
        )}
        <FormInput
          {...register("bio")}
          type="text"
          placeholder="Start Career"
        />
        {errors.bio && <p className="text-rose-600">* {errors.bio.message}</p>}
        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="w-56 px-4 py-2 text-white bg-red-500 rounded-md"
          >
            Add Artist
          </button>
        </div>
      </form>
    </div>
  );
}
