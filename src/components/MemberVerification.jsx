import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUnVerifiedMembers, verifyMember } from "../api";
import { notifyError, notifySuccess } from "../toast";
import Loader from "./Loader";

const MemberVerification = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["unverifiedMembers"],
    queryFn: getUnVerifiedMembers,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: () => notifyError("Failed to fetch unverified users."),
  });

  const { mutate } = useMutation({
    mutationFn: verifyMember,
    onSuccess: () => {
      notifySuccess("Member verified.");
      refetch();
    },
    onError: () => notifyError("Failed to verify user."),
  });

  const handleVerify = (memberId) => {
    mutate(memberId);
  };

  const unverifiedMembers = data?.unverifiedMembers || [];

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      {isLoading ? (
        <Loader />
      ) : unverifiedMembers.length === 0 ? (
        <p className="text-gray-500">No unverification requests.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {unverifiedMembers.map(({ student: user, position, _id }) => (
            <div
              key={user._id}
              className="border rounded-md p-2 shadow-sm bg-white flex justify-between w-full items-center"
            >
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500 capitalize">{position}</p>
              <button
                onClick={() => handleVerify(_id)}
                className=" bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Verify
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberVerification;
