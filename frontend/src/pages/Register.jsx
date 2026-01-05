import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault(); // 🔥 IMPORTANT

    try {
      setError("");
      await api.post("/auth/register", data); // 🔥 FIXED
      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Account already exists"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-ivory">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          required
          placeholder="Name"
          className="border p-2 w-full mb-4 rounded"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          required
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-6 rounded"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-orange-300 border hover:bg-orange-500 font-bold text-black w-full py-2 rounded hover:opacity-90"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-primary hover:text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
