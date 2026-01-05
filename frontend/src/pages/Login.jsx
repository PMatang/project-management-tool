import api from "../api/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", data);
    login(res.data.token, res.data.role);
    window.location.href =
      res.data.role === "admin" ? "/admin" : "/member";
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          required
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-6 rounded"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-orange-300 border hover:bg-orange-500 text-black font-bold w-full py-2 rounded hover:opacity-90"
        >
          Login
        </button>
       <div className="text-right mb-4">
  <Link
    to="/forgot-password"
    className="text-sm text-blue-500 hover:text-blue-600 underline"
  >
    Forgot password?
  </Link>
</div>



        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
