import { useState } from "react";
import api from "../api/axios";

const ChangePasswordCard = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const submit = async () => {
    await api.post("/auth/change-password", form);
    alert("Password updated successfully");
    setForm({ oldPassword: "", newPassword: "" });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        className="border p-2 w-full rounded"
        value={form.oldPassword}
        onChange={(e) =>
          setForm({ ...form, oldPassword: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        className="border p-2 w-full rounded"
        value={form.newPassword}
        onChange={(e) =>
          setForm({ ...form, newPassword: e.target.value })
        }
      />

      <button
        onClick={submit}
        className="bg-primary text-black bg-orange-300 border hover:bg-orange-500 px-4 py-2 rounded"
      >
        Update Password
      </button>
    </div>
  );
};

export default ChangePasswordCard;
