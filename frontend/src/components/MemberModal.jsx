import { useState } from "react";
import api from "../api/axios";

const MemberModal = ({ open, onClose, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  if (!open) return null;

  const submit = async () => {
    await api.post("/auth/register", form);
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-380px p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add Member</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Temporary Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 bg-red-500 py-2 hover:bg-red-600 hover:text-white rounded">
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-primary text-black border bg-orange-300 hover:bg-orange-500 px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
