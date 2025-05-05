import React from "react";
import dummy from "../assets/dummy.jpeg";

const LeaderBoardCandidates = ({ role, members }) => {
  const sortedMembers = [...members].sort((a, b) => b.votes - a.votes);

  return (
    <div key={role}>
      <h3 className="text-xl font-semibold mb-2 text-black w-full bg-gradient-to-r rounded-l-xl pl-4 py-1">
        {role}
      </h3>
      <div className="flex flex-col gap-4">
        {sortedMembers.length > 0 ? (
          sortedMembers.map(({ nominee: user, votes }, index) => (
            <div
              key={user?._id}
              className="flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-md shadow"
            >
              <div className="flex gap-4 items-center">
                <span className="text-lg font-bold w-6 text-center">{index + 1}</span>
                <img
                  src={user?.profileImg || dummy}
                  alt={user?.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">Votes: {votes}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No candidates yet.</p>
        )}
      </div>
    </div>
  );
};

export default LeaderBoardCandidates;
