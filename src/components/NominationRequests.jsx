import React, { useState } from "react";
import {
  acceptNomination,
  getPendingNominations,
  rejectNomination,
} from "../api.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "./Loader.jsx";
import { notifyError, notifySuccess } from "../toast.js";

const NominationRequests = () => {
  const [processingId, setProcessingId] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["nominations"],
    queryFn: getPendingNominations,
    refetchInterval: 10000,
    onError: (error) => console.error("Error fetching nominations:", error),
  });

  const { mutate: acceptNominationMutation } = useMutation({
    mutationFn: acceptNomination,
    onSuccess: () => {
      notifySuccess("Nomination accepted.");
      refetch();
      setProcessingId(null);
    },
    onError: (error) => {
      notifyError(error?.response?.data?.message || "Error accepting nomination.");
      setProcessingId(null);
    },
  });

  const { mutate: rejectNominationMutation } = useMutation({
    mutationFn: rejectNomination,
    onSuccess: () => {
      notifySuccess("Nomination rejected successfully!");
      refetch();
      setProcessingId(null);
    },
    onError: () => {
      notifyError("Error rejecting nomination.");
      setProcessingId(null);
    },
  });

  const handleAction = (id, type) => {
    setProcessingId(id);
    type === "accept"
      ? acceptNominationMutation(id)
      : rejectNominationMutation(id);
  };

  const nominations = data?.nominations || [];

  const groupedByElection = nominations.reduce((acc, nomination) => {
    const electionName = nomination.election.name;
    const position = nomination.position;

    if (!acc[electionName]) acc[electionName] = {};
    if (!acc[electionName][position]) acc[electionName][position] = [];

    acc[electionName][position].push(nomination);
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader />
        </div>
      ) : nominations.length === 0 ? (
        <p className="text-gray-500 text-center">
          No nomination requests available.
        </p>
      ) : (
        Object.entries(groupedByElection).map(([electionName, positions]) => (
          <div key={electionName} className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-sky-600 to-transparent px-4 rounded-l-md">
              {electionName}
            </h3>
            {Object.entries(positions).map(
              ([position, positionNominations]) => (
                <div key={position} className="mb-6">
                  <h4 className="text-xl font-semibold text-indigo-700 mb-3">
                    {position}
                  </h4>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {positionNominations.map(
                      ({ userInfo: user, status, _id }) => (
                        <div
                          key={_id}
                          className={`rounded-md p-5 border shadow-md transition ${
                            status === "accepted"
                              ? "bg-green-50 border-green-200"
                              : "bg-white"
                          }`}
                        >
                          <h4 className="text-lg font-bold text-gray-900">
                            {user.name}
                          </h4>
                          <p className="text-gray-600 mb-1">
                            {user.enrollmentNumber}
                          </p>

                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>

                          {status === "pending" && (
                            <div className="mt-4 flex gap-3">
                              <button
                                onClick={() => handleAction(_id, "accept")}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                                disabled={processingId === _id}
                              >
                                {processingId === _id ? (
                                  <Loader size="sm" />
                                ) : (
                                  "Accept"
                                )}
                              </button>
                              <button
                                onClick={() => handleAction(_id, "reject")}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
                                disabled={processingId === _id}
                              >
                                {processingId === _id ? (
                                  <Loader size="sm" />
                                ) : (
                                  "Reject"
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NominationRequests;
