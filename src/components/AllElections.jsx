import React from "react";
import { getAllElections } from "../api";
import { notifyError } from "../toast";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";

const AllElections = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["elections"],
    queryFn: getAllElections,
    onError: (error) => {
      notifyError("Failed to fetch elections", error?.message);
    },
  });

  const elections = data?.elections || [];

  return (
    <div className="flex h-fit bg-gray-100/50 p-2 rounded-md">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full">
          {elections?.map((election) => (
            <ElectionCard key={election._id} election={election} />
          ))}
        </div>
      )}
    </div>
  );
};

const ElectionCard = ({ election }) => {
  return (
    <div className="flex justify-between items-center w-full ">
      <h3 className="text-lg font-semibold">{election.name}</h3>
      <p className="text-gray-600 bg-sky-500/50 w-fit px-2 py-1 rounded-md">
        Election Date - {format(election.startDate, "dd/MM/yyyy")}
      </p>
      <p className="text-gray-800 hover:text-red-500 cursor-pointer">
        <MdDelete />
      </p>
    </div>
  );
};

export default AllElections;
