import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export const getElectionWinners = (electionsData) => {
  return electionsData?.map((election) => {
    const resultsWithWinners = election.results.map((result) => {
      // Sort candidates by votes in descending order
      const sortedCandidates = result.candidates.sort((a, b) => b.votes - a.votes);

      // Get the winner (the candidate with the highest votes)
      const winner = sortedCandidates[0];

      return {
        position: result.position,
        winner: {
          _id: winner._id,
          userId: winner.userId,
          votes: winner.votes,
          student: {
            _id: winner.student._id,
            name: winner.student.name,
            email: winner.student.email,
            enrollmentNumber: winner.student.enrollmentNumber,
            profileImg: winner.student.profileImg,
          },
        },
      };
    });

    return {
      electionId: election.electionId,
      name: election.name,
      description: election.description,
      startDate: election.startDate,
      endDate: election.endDate,
      imageUrl: election.imageUrl,
      resultsWithWinners,
    };
  });
};

