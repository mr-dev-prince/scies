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
    const resultsWithWinners = election?.results?.map((result) => {
      const sortedCandidates = [...(result?.candidates || [])].sort(
        (a, b) => b.votes - a.votes
      );

      const winner = sortedCandidates[0];

      return {
        position: result?.position,
        winner:
          winner && winner.student
            ? {
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
              }
            : null,
      };
    });

    return {
      electionId: election?.electionId,
      name: election?.name,
      description: election?.description,
      startDate: election?.startDate,
      endDate: election?.endDate,
      imageUrl: election?.imageUrl,
      resultsWithWinners,
    };
  });
};

export const getWinnerEmailsPositionsAndElectionNames = (electionsData) => {
  const winners = [];

  electionsData?.forEach((election) => {
    election?.results?.forEach((result) => {
      const sortedCandidates = [...(result?.candidates || [])].sort(
        (a, b) => b.votes - a.votes
      );

      const winner = sortedCandidates[0];

      if (winner?.student?.email) {
        winners.push({
          email: winner.student.email,
          position: result?.position,
          electionName: election?.name,
        });
      }
    });
  });

  return winners;
};
