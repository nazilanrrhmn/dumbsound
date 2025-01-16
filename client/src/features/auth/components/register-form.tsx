import { useRegisterForm } from "../hooks/use-register.form";

export default function RegisterForm() {
  const { register, handleSubmit, errors, onSubmit } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-rose-600 text-sm mt-1">
                * {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-rose-600 text-sm mt-1">
                * {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("fullname")}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              aria-invalid={errors.fullname ? "true" : "false"}
            />
            {errors.fullname && (
              <p className="text-rose-600 text-sm mt-1">
                * {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("gender")}
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-gray-500"
              defaultValue=""
              aria-invalid={errors.gender ? "true" : "false"}
            >
              <option value="" disabled className="text-gray-400">
                Select Gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && (
              <p className="text-rose-600 text-sm mt-1">
                * {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone"
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-rose-600 text-sm mt-1">
                * {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("address")}
              type="text"
              placeholder="Address"
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              aria-invalid={errors.address ? "true" : "false"}
            />
            {errors.address && (
              <p className="text-rose-600 text-sm mt-1">
                * {errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?
          <a
            href="/login"
            className="text-white font-semibold ml-1 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
