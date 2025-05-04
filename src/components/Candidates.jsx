import React from "react";
import { FaVoteYea } from "react-icons/fa";
import dummy from "../assets/dummy.jpeg";
import { useMutation } from "@tanstack/react-query";
import { addVote } from "../api";
import { notifyError, notifySuccess } from "../toast";

const Candidates = ({ role, members, electionId }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const { mutate } = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      notifySuccess("Vote successful");
    },
    onError: (error) => {
      notifyError(error.response.data.message);
    },
  });

  const handleVote = (candidateId) => {
    const voteData = {
      userId: currentUser._id,
      electionId,
      position: role,
      candidateId,
    };
    mutate(voteData);
  };

  return (
    <div key={role}>
      <h3 className="text-xl font-semibold mb-2 text-black w-full bg-gradient-to-r rounded-l-xl pl-4 py-1">
        {role}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.length > 0 ? (
          members.map(({ nominee: user, votes }) => (
            <div
              key={user?._id}
              className="flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-md shadow"
            >
              <div className="flex gap-4">
                <img
                  src={user?.profileImg || dummy}
                  alt={user?.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">Votes : {votes}</p>
                </div>
              </div>
              <button onClick={() => handleVote(user?._id)}>
                <FaVoteYea
                  size={24}
                  className="hover:text-green-600 cursor-pointer"
                />
              </button>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
