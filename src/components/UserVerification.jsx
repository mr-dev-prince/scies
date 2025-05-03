import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUnverifiedUsers } from "../api";
import { notifyError } from "../toast";

const UserVerifications = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["unverifiedUsers"],
    queryFn: getUnverifiedUsers,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: () => notifyError("Failed to fetch unverified users."),
  });

  //   const { mutate } = useMutation({
  //     mutationFn: verifyUser,
  //     onSuccess: () => {
  //       notifySuccess("User verified successfully.");
  //       queryClient.invalidateQueries(["unverifiedUsers"]);
  //     },
  //     onError: () => notifyError("Failed to verify user."),
  //   });

  //   const handleVerify = (userId) => {
  //     mutate(userId);
  //   };

  const unverifiedUsers = data?.unverifiedUsers || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        User Verifications
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : unverifiedUsers.length === 0 ? (
        <p className="text-gray-500">No unverified users.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {unverifiedUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg p-2 shadow-sm bg-white flex justify-between w-full items-center"
            >
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500 capitalize">{user.role}</p>
              <button className="    bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
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
