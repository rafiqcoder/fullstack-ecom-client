import React from "react";
import WellcomeDash from "../../components/WellcomeDash";
import { useIsAdmin } from "../../hooks/isAdmin";

const Dashboard = () => {
  const { isAdmin, isAdminLoading } = useIsAdmin();

  if (isAdminLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"> loading ...</div>
      </div>
    );
  }

  console.log("Is Admin: from dashboard", isAdmin);

  return (
    <>
      <WellcomeDash></WellcomeDash>
    </>
  );
};

export default Dashboard;
