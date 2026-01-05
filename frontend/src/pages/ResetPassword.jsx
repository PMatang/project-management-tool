import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post(`/auth/reset-password/${token}`, { password });
    setMessage("Password reset successful");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          required
          placeholder="New password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-orange-300 border hover:bg-orange-500 w-full py-2 rounded font-bold"
        >
          Reset Password
        </button>

        {message && (
          <p className="text-green-600 text-sm mt-3">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
