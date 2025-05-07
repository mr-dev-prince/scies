import React, { useEffect, useMemo, useState } from "react";
import Voting from "../components/Voting";
import Modal from "../components/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { notifyError, notifySuccess } from "../toast";
import { HiDocumentAdd } from "react-icons/hi";
import StickyButton from "../components/StickyButton";
import {
  createNomination,
  getAllElections,
  getResults,
  sendEmail,
} from "../api";
import {
  getElectionWinners,
  getWinnerEmailsPositionsAndElectionNames,
} from "../utils/helper";
import Vote from "../assets/Vote.jpg";
import Winners from "../components/Winners";

const Elections = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedElection, setSelectedElection] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading } = useQuery({
    queryKey: ["elections"],
    queryFn: getAllElections,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  const { data: results } = useQuery({
    queryKey: ["results"],
    queryFn: getResults,
    onError: (error) => {
      notifyError(error.response?.data?.message || "Failed to fetch results.");
    },
  });

  const { mutate: emailMutation } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      console.log("Email sent to winners.");
    },
    onError: (error) => {
      notifyError(error.response?.data?.message || "Failed to send email.");
    },
  });

  const electionResult = getElectionWinners(results) || [];

  const emailData = useMemo(() => {
    return getWinnerEmailsPositionsAndElectionNames(results) || [];
  }, [results]);

  const selectedElectionObj = useMemo(
    () => data?.elections?.find((e) => e._id === selectedElection),
    [selectedElection, data]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: createNomination,
    onSuccess: () => {
      notifySuccess("You are successfully nominated.");
      resetForm();
      closeModal();
    },
    onError: (error) => {
      notifyError(error.response?.data?.message || "Nomination failed.");
    },
  });

  const resetForm = () => {
    setSelectedElection("");
    setSelectedPosition("");
  };

  const closeModal = () => setActiveModal(null);

  const handleNominationSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      notifyError("Please login to nominate yourself");
      return;
    }
    if (!selectedElection || !selectedPosition) {
      notifyError("Please select an election and position");
      return;
    }
    mutate({
      electionId: selectedElection,
      position: selectedPosition,
      userId: currentUser?._id,
    });
  };

  const renderNominationForm = () => (
    <form onSubmit={handleNominationSubmit} className="flex flex-col gap-3">
      <select
        className="border p-2 rounded"
        value={selectedElection}
        onChange={(e) => {
          setSelectedElection(e.target.value);
          setSelectedPosition("");
        }}
        required
      >
        <option value="">Select Election</option>
        {data?.elections?.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        required
        disabled={!selectedElection}
      >
        <option value="">Select Position</option>
        {selectedElectionObj?.positions?.map((p) => (
          <option key={p._id} value={p.title}>
            {p.title}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 h-10 flex justify-center items-center disabled:opacity-60"
        disabled={isPending}
      >
        {isLoading ? <Loader /> : "Submit Nomination"}
      </button>
    </form>
  );

  useEffect(() => {
    const sendAllEmails = async () => {
      const alreadySent = sessionStorage.getItem("emailSent");
      if (!alreadySent && emailData?.length > 0) {
        await Promise.all(
          emailData.map(({ email, position, electionName }) =>
            emailMutation({
              email,
              subject: `Congratulations on winning the ${position} position in the ${electionName} election!`,
              body: `Dear Winner,\n\nCongratulations on winning the ${position} position in the ${electionName} election! Your hard work and dedication have paid off, and we are proud to have you as a part of our team.\n\nBest regards,\nElection Committee`,
            })
          )
        );

        sessionStorage.setItem("emailSent", "true");
      }
    };

    sendAllEmails();
  }, [emailData, emailMutation]);

  return (
    <>
      <div className="pt-[12vh] flex flex-col gap-10">
        {data?.elections?.length > 0 && <Voting />}
        {electionResult.length > 0 && (
          <div className="px-12">
            <div className="h-[10vh] w-full flex flex-col sm:flex-row justify-center md:justify-between px-4 sm:px-12 items-center bg-gradient-to-l from-white via-sky-200 to-orange-600 shadow-md rounded-md">
              <p className="cal-sans text-4xl tracking-wider text-white">
                Results
              </p>
            </div>
            <Winners electionResult={electionResult} />
          </div>
        )}
        {data?.elections?.length === 0 && electionResult.length === 0 && (
          <div className="flex flex-col justify-center items-center text-xl text-gray-500 gap-8 h-screen md:h-fit px-4">
            <p className="text-3xl font-semibold cal-sans tracking-wider mt-5 text-center">
              No Ongoing Elections Available
            </p>
            <img src={Vote} alt="No Elections" className="rounded-md" />
          </div>
        )}
      </div>
      {currentUser && data?.elections?.length > 0 && (
        <div className="fixed top-[15%] right-0 flex flex-col gap-4 z-50 -translate-y-1/2">
          <StickyButton
            title="Nominations"
            Icon={HiDocumentAdd}
            onClick={() => setActiveModal("nomination")}
          />
        </div>
      )}
      <Modal
        isOpen={activeModal === "nomination"}
        onClose={closeModal}
        title="Candidate Nomination"
      >
        {isLoading ? (
          <div className="bg-gray-300 p-4 rounded">
            <Loader />
          </div>
        ) : (
          renderNominationForm()
        )}
      </Modal>
    </>
  );
};

export default Elections;
