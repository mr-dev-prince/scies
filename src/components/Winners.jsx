import React from "react";
import dummy from "../assets/dummy.jpeg";

const Winners = ({ electionResult }) => {
  return (
    <div>
      {electionResult.map((election) => (
        <div key={election.electionId} className="w-full mb-6 mt-4">
          <div className="h-[10vh] w-full flex flex-col sm:flex-row justify-center  md:justify-between px-4 sm:px-12 items-center bg-gradient-to-l from-white via-sky-200 to-sky-600 shadow-md rounded-md">
            <p className="cal-sans text-2xl sm:text-4xl tracking-wide text-black md:text-white text-center sm:text-left">
              {election.name}
            </p>
            <p className="cal-sans text-lg sm:text-2xl tracking-wider text-black text-center sm:text-left">
              Election Date:
              {new Date(election.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="w-full h-fit sm:h-[75vh] flex flex-col sm:flex-row gap-4 mt-3">
            <div className="w-full rounded-md bg-gray-700/50">
              <div className="w-full border-b-[1px] py-2 px-4">
                <p className="cal-sans text-2xl text-white">Results</p>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(75vh-48px)] hide-scrollbar flex flex-col gap-4">
                {election.resultsWithWinners.map((result) => (
                  <div
                    key={result.position}
                    className="bg-gray-800/20 rounded-md flex justify-center items-center flex-col pb-6"
                  >
                    <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 w-full text-center py-2 rounded-t-md">
                      {result.position}
                    </h3>
                    <div className="border-2 relative rounded-md w-[200px] h-[250px] flex flex-col items-center justify-center mt-2 bg-gray-300/20">
                      <div className="py-2 flex justify-center items-center h-[50%]">
                        <img
                          src={result.winner.student.profileImg || dummy}
                          alt=""
                          className="h-full rounded-full"
                        />
                      </div>
                      <div className="mt-2 flex flex-col gap-1 items-center text-white ">
                        <p className="text-white font-semibold">
                          {result?.winner?.student?.name}
                        </p>
                        <p>{result?.winner?.student?.email}</p>
                        <p>Votes : {result?.winner?.votes}</p>
                      </div>
                      <span className="absolute -bottom-5 bg-green-600 w-[50%] py-1 text-white rounded-sm text-center cal-sans">
                        Winner
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Winners;
