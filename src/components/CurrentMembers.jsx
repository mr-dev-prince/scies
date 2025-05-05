import React from "react";
import dummy from "../assets/dummy.jpeg";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api";
import { notifyError } from "../toast";

const CurrentMembers = () => {
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
    refetchOnWindowFocus: false,
    onError: () => {
      notifyError("Failed to fetch members.");
    },
  });

  const president = data?.find(
    (member) => member.position.toLowerCase() === "president"
  );

  const vicePresident = data?.find(
    (member) => member.position.toLowerCase() === "vice president"
  );

  const secretary = data?.find(
    (member) => member.position.toLowerCase() === "secretary"
  );

  const members = data?.filter(
    (member) =>
      member.position.toLowerCase() !== "president" &&
      member.position.toLowerCase() !== "vice president" &&
      member.position.toLowerCase() !== "secretary"
  );

  return (
    <>
      <div className="h-[10vh] flex justify-center items-center mt-5">
        <p className="cal-sans text-5xl tracking-wider">Current Members</p>
      </div>
      <div className="w-full h-fit flex justify-center items-center gap-4 px-10">
        <div className="w-fit px-24 py-2">
          <div className="p-4 hide-scrollbar flex justify-center items-center gap-24 bg-gray-600/50 rounded-md">
            {president ? <MemberCard member={president} /> : <DummyCard />}
            {vicePresident ? <MemberCard member={vicePresident} /> : <DummyCard />}
            {secretary ? <MemberCard member={secretary} /> : <DummyCard />}
          </div>
          <div className="flex flex-wrap gap-5 justify-center items-center mt-12">
            {members?.length > 0 ? (
              members.map((member) => (
                <MemberCard2 key={member._id} member={member} />
              ))
            ) : (
              <p className="text-white bg-black px-10 py-2 rounded-md font-semibold text-lg text-center mt-10">
                No members have been added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const MemberCard2 = () => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-md shadow h-[25vh] w-[15vw]`}
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

const MemberCard = ({ member }) => {
  const { student } = member || {};
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-md shadow h-[30vh] w-[15vw]`}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <img
          src={student?.profileImg || dummy}
          alt="Member Name"
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-medium">{student?.name}</p>
          <p className="text-sm text-gray-500">{member?.position}</p>
        </div>
      </div>
    </div>
  );
};

const DummyCard = () => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-md shadow h-[30vh] w-[15vw]`}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <img
          src={dummy}
          alt="Member Name"
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-medium">Member Name</p>
          <p className="text-sm text-gray-500">Member Designation</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentMembers;
