import React from "react";
import NominationRequests from "../components/NominationRequests";
import UserVerifications from "../components/UserVerification";
import OrganizeElection from "../components/OrganizeElection";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 pt-[12vh]">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 cal-sans tracking-wider">
        Admin Dashboard
      </h1>
      <NominationRequests />
      <UserVerifications />
      <OrganizeElection />
    </div>
  );
};

export default Dashboard;
