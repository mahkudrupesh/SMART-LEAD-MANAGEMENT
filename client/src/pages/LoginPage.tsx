import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to Smart Lead Management CRM
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
