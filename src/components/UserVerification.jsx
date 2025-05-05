import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUnverifiedUsers, verifyUser } from "../api";
import { notifyError, notifySuccess } from "../toast";

const UserVerifications = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["unverifiedUsers"],
    queryFn: getUnverifiedUsers,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: () => notifyError("Failed to fetch unverified users."),
  });

  const { mutate } = useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      notifySuccess("User verified.");
      refetch();
    },
    onError: () => notifyError("Failed to verify user."),
  });

  const handleVerify = (userId) => {
    mutate(userId);
  };

  const unverifiedUsers =
    data?.unverifiedUsers.filter((user) => user.role !== "council") || [];

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      {isLoading ? (
        <p>Loading...</p>
      ) : unverifiedUsers.length === 0 ? (
        <p className="text-gray-500">No unverification requests.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {unverifiedUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-md p-2 shadow-sm bg-white flex justify-between w-full items-center"
            >
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500 capitalize">{user.role}</p>
              <button
                onClick={() => handleVerify(user._id)}
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

export default UserVerifications;
