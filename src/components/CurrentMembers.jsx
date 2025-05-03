import React from "react";
import dummy from "../assets/dummy.jpeg";

const CurrentMembers = () => {
  return (
    <>
      <div className="h-[10vh] flex justify-center items-center mt-5">
        <p className="cal-sans text-5xl tracking-wider">Current Members</p>
      </div>
      <div className="w-full h-fit flex gap-4 px-10">
        <div className="w-full px-24 py-2">
          <div className="p-4 hide-scrollbar flex justify-center items-center gap-24 bg-gray-600/50 rounded-xl">
            <MemberCard />
            <MemberCard />
            <MemberCard />
          </div>
          <div className="flex flex-wrap gap-5 justify-center items-center mt-12">
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
          </div>
        </div>
      </div>
    </>
  );
};

const MemberCard2 = () => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-xl shadow h-[25vh] w-[15vw]`}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <img
          src={dummy}
          alt="Member Name"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-medium">Member Name</p>
          <p className="text-sm text-gray-500">Role</p>
        </div>
      </div>
    </div>
  );
};

const MemberCard = () => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-xl shadow h-[30vh] w-[15vw]`}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <img
          src={dummy}
          alt="Member Name"
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-medium">Member Name</p>
          <p className="text-sm text-gray-500">Role</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentMembers;
