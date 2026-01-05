import { useState } from "react";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/forgot-password", { email });
    setMessage(res.data.message);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          required
          placeholder="Enter your email"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-orange-300 border hover:bg-orange-500 w-full py-2 rounded font-bold"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="text-sm text-green-600 mt-4">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
