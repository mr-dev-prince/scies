import React from "react";
import { deleteElection, getAllElections } from "../api";
import { notifyError, notifySuccess } from "../toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";

const AllElections = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["elections"],
    queryFn: getAllElections,
    onError: (error) => {
      notifyError("Failed to fetch elections", error?.message);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteElection,
    onSuccess: () => {
      notifySuccess("Election deletion successful");
      refetch();
    },
    onError: () => {
      notifyError("Failed to delete election");
    },
  });

  const handleDelete = (electionId) => {
    if (isPending) return;
    mutate(electionId);
  };

  const elections = data?.elections || [];

  return (
    <div className="flex flex-col gap-4 h-fit bg-gray-100/50 p-4 rounded-md">
      {isLoading ? (
        <p>Loading...</p>
      ) : elections.length === 0 ? (
        <p className="text-gray-500">No elections found.</p>
      ) : (
        <div className="w-full space-y-4">
          {elections.map((election) => (
            <ElectionCard
              key={election._id}
              election={election}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ElectionCard = ({ election, handleDelete }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2 border bg-white p-3 rounded-md shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
        {election.name}
      </h3>
      <p className="text-sm text-gray-700 bg-sky-100 px-3 py-1 rounded-md w-fit">
        Election Date: {format(election.startDate, "dd/MM/yyyy")}
      </p>
      <button
        onClick={() => handleDelete(election._id)}
        type="button"
        className="text-red-600 text-md self-start sm:self-center flex items-center justify-center p-2 rounded-md border border-red-600 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out gap-2"
        title="Delete election"
      >
        <MdDelete /> Delete
      </button>
    </div>
  );
};

export default AllElections;
