import React from "react";
import Candidates from "./Candidates";
import LeaderBoardCandidates from "./LeaderBoardCandidates";
import { useQuery } from "@tanstack/react-query";
import { getAllElections } from "../api";

const groupNominationsByPosition = (nominations) => {
  return nominations.reduce((acc, nomination) => {
    if (!acc[nomination.position]) {
      acc[nomination.position] = [];
    }
    acc[nomination.position].push(nomination);
    return acc;
  }, {});
};

const Voting = () => {
  // const currentUser = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading } = useQuery({
    queryKey: ["elections"],
    queryFn: getAllElections,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen px-10 flex flex-col items-center gap-12">
      {data.elections.map((election) => {
        const groupedCandidates = groupNominationsByPosition(
          election.nominations
        );
        return (
          <div key={election._id} className="w-full">
            <div className="h-[10vh] w-full flex justify-center items-center bg-gradient-to-l from-white via-sky-200 to-sky-600 shadow-md rounded-xl">
              <p className="cal-sans text-4xl tracking-wide">{election.name}</p>
            </div>
            <div className="w-full h-[75vh] flex gap-4 mt-3">
              <div className="w-[75%] rounded-xl bg-gray-700/50">
                <div className="w-full border-b-[1px] py-2 px-4">
                  <p className="cal-sans text-2xl text-white">Candidates</p>
                </div>
                <div className="p-4 space-y-6 overflow-y-auto h-[calc(75vh-48px)] hide-scrollbar">
                  {Object.entries(groupedCandidates).map(([role, members]) => (
                    <Candidates
                      key={role}
                      role={role}
                      members={members}
                      electionId={election._id}
                    />
                  ))}
                </div>
              </div>
              <div className="w-[25%] h-full rounded-xl bg-gray-700/50">
                <div className="w-full border-b-[1px] py-2 px-4">
                  <p className="cal-sans text-2xl text-white">Leaderboard</p>
                </div>
                <div className="p-4 space-y-6 overflow-y-auto h-[calc(75vh-48px)] hide-scrollbar">
                  {Object.entries(groupedCandidates).map(([role, members]) => (
                    <LeaderBoardCandidates
                      key={role}
                      role={role}
                      members={members}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Voting;
