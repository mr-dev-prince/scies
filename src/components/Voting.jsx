import React from "react";
import Candidates from "./Candidates";
import LeaderBoardCandidates from "./LeaderBoardCandidates";
import { useQuery } from "@tanstack/react-query";
import { getAllElections } from "../api";
import { format } from "date-fns";

const groupNominationsByPosition = (nominations) => {
  return (
    nominations?.reduce((acc, nomination) => {
      if (!acc[nomination.position]) {
        acc[nomination.position] = [];
      }
      acc[nomination.position].push(nomination);
      return acc;
    }, {}) || {}
  );
};

const Voting = () => {
  const { data } = useQuery({
    queryKey: ["elections"],
    queryFn: getAllElections,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <div className="min-h-screen px-6 sm:px-10 flex flex-col items-center gap-12">
      {data?.elections?.map((election) => {
        const hasNominations = election.nominations?.length > 0;
        const groupedCandidates = groupNominationsByPosition(
          election.nominations
        );
        return (
          <div key={election._id} className="w-full mb-6">
            <div className="h-[10vh] w-full flex flex-col sm:flex-row justify-center  md:justify-between px-4 sm:px-12 items-center bg-gradient-to-l from-white via-sky-200 to-sky-600 shadow-md rounded-md">
              <p className="cal-sans text-2xl sm:text-4xl tracking-wide text-black md:text-white text-center sm:text-left">{election.name}</p>
              <p className="cal-sans text-lg sm:text-2xl tracking-wider text-black text-center sm:text-left">
                Election Date: {format(election.startDate, "dd MMMM yyyy")}
              </p>
            </div>
            <div className="w-full h-fit sm:h-[75vh] flex flex-col sm:flex-row gap-4 mt-3">
              <div className="w-full sm:w-[75%] rounded-md bg-gray-700/50">
                <div className="w-full border-b-[1px] py-2 px-4">
                  <p className="cal-sans text-2xl text-white">Candidates</p>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(75vh-48px)] sm:h-[calc(75vh-48px)] hide-scrollbar flex flex-col gap-4">
                  {hasNominations ? (
                    Object.entries(groupedCandidates).map(([role, members]) => (
                      <Candidates
                        key={role}
                        role={role}
                        members={members}
                        electionId={election._id}
                      />
                    ))
                  ) : (
                    <p className="text-white text-lg text-center mt-10">
                      No candidates have been nominated yet.
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full sm:w-[25%] h-full rounded-md bg-gray-700/50">
                <div className="w-full border-b-[1px] py-2 px-4">
                  <p className="cal-sans text-2xl text-white">Leaderboard</p>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(75vh-48px)] sm:h-[calc(75vh-48px)] hide-scrollbar flex flex-col gap-4">
                  {hasNominations ? (
                    Object.entries(groupedCandidates).map(([role, members]) => (
                      <LeaderBoardCandidates
                        key={role}
                        role={role}
                        members={members}
                      />
                    ))
                  ) : (
                    <p className="text-white text-lg text-center mt-10">
                      Leaderboard is empty. No votes have been cast.
                    </p>
                  )}
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
