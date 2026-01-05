import { useState } from "react";
import api from "../api/axios";

const ProfileInfoCard = ({ user, isAdmin, refresh }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email
  });

  const save = async () => {
    await api.patch(`/users/${user._id}`, form);
    setEdit(false);
    refresh();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3">
      <h2 className="text-xl font-bold">Profile Information</h2>

      {/* Name */}
      <div>
        <label className="text-sm text-gray-500">Name</label>
        <input
          disabled={!edit}
          className={`border p-2 w-full rounded ${
            !edit && "bg-gray-100"
          }`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray-500">Email</label>
        <input
          disabled={!edit}
          className={`border p-2 w-full rounded ${
            !edit && "bg-gray-100"
          }`}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* Role */}
      <div>
        <label className="text-sm text-gray-500">Role</label>
        <input
          disabled
          className="border p-2 w-full rounded bg-gray-100"
          value={user.role}
        />
      </div>

      {isAdmin && (
        <div className="flex gap-3 mt-3">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="px-4 py-2 bg-orange-300 border hover:bg-orange-500 text-black rounded"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={save}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEdit(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 border rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;
