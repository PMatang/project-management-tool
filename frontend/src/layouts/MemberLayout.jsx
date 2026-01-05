import MemberNavbar from "../components/MemberNavbar";
import AppLayout from "./AppLayout";

const MemberLayout = ({ children }) => {
  return (
    <>
      <MemberNavbar />
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default MemberLayout;
