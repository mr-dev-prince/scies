import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, getUnverifiedUsers, verifyUser } from "../api";
import { notifyError, notifySuccess } from "../toast";
import Loader from "./Loader";

const UserVerifications = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["unverifiedUsers"],
    queryFn: getUnverifiedUsers,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: () => notifyError("Failed to fetch unverified users."),
  });

  const { mutate, isPending: verifying } = useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      notifySuccess("User verified.");
      refetch();
    },
    onError: () => notifyError("Failed to verify user."),
  });

  const { mutate: deleteMutation, isPending: deleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      notifySuccess("User Deleted!");
      refetch();
    },
    onError: () => {
      notifyError("Failed to delete.");
    },
  });

  const handleDelete = (userId) => {
    deleteMutation(userId);
  };

  const handleVerify = (userId) => {
    mutate(userId);
  };

  const unverifiedUsers =
    data?.unverifiedUsers.filter((user) => user.role !== "council") || [];

  return (
    <div className="bg-white p-3 rounded-md shadow-md">
      {isLoading ? (
        <p>Loading...</p>
      ) : unverifiedUsers.length === 0 ? (
        <p className="text-gray-500">No unverification requests.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {unverifiedUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-md p-2 shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center w-full sm:flex-row sm:items-center sm:space-x-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:w-[90%]">
                <h3 className="text-lg font-bold text-gray-800 md:w-[30%]">
                  {user.name}
                </h3>
                <p className="text-gray-600 w-[30%] ">{user.email}</p>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="w-full md:w-[20%] flex justify-start md:justify-center items-center gap-4 mt-2">
                <button
                  onClick={() => handleVerify(user._id)}
                  className="bg-green-600 text-white h-10 rounded hover:bg-green-700 transition sm:mt-0 w-[40%]"
                >
                  {verifying ? <Loader /> : "Verify"}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-gray-600 text-white h-10 rounded hover:bg-red-700 transition sm:mt-0 w-[40%]"
                >
                  {deleting ? <Loader /> : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserVerifications;
