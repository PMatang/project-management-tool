import AdminNavbar from "../components/AdminNavbar";
import AppLayout from "./AppLayout";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default AdminLayout;
