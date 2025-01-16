import { useLoginForm } from "../hooks/use-login-form";

export default function LoginForm() {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
          {errors.email && (
            <p className="text-rose-600">* {errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
          {errors.password && (
            <p className="text-rose-600">* {errors.password.message}</p>
          )}
          <button
            type="submit"
            className="w-full p-3 mt-4 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400">
          Don't have an account ?
          <a href="#" className="text-white font-semibold ml-1 hover:underline">
            Here
          </a>
        </p>
      </div>
    </div>
  );
}
