import { useEffect, useState } from "react";
import api from "../api/axios";
import MemberCard from "./MemberCard";
import MemberModal from "./MemberModal";

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);

  const loadMembers = () => {
    api.get("/users").then(res => setMembers(res.data));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const removeMember = async (id) => {
    if (!confirm("Remove this member?")) return;
    await api.delete(`/users/${id}`);
    loadMembers();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Team Members</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-black px-4 py-2 rounded border bg-orange-300 hover:bg-orange-500"
        >
          + Add Member
        </button>
      </div>

     
       <div className="grid gap-3">
  {members.map(member => (
    <MemberCard
      key={member._id}
      member={member}
      onDelete={removeMember}
    />
  ))}
</div>


      <MemberModal
  open={open}
  onClose={() => setOpen(false)}
  refresh={loadMembers}
/>

    </div>
  );
};

export default MemberManagement;
