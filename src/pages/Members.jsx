import React, { useMemo, useState } from "react";
import Voting from "../components/Voting";
import CurrentMembers from "../components/CurrentMembers";
import Modal from "../components/Modal";
import { FaUserPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNomination, getAllElections } from "../api";
import Loader from "../components/Loader";
import { notifyError, notifySuccess } from "../toast";

const Members = () => {
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
    if (!selectedElection || !selectedPosition) {
      notifyError("Please select an election and position");
      return;
    }
    mutate({
      electionId: selectedElection,
      position: selectedPosition,
      userId: currentUser._id,
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
        {isPending ? <Loader /> : "Submit Nomination"}
      </button>
    </form>
  );

  return (
    <>
      <div className="h-fit pt-[12vh] flex flex-col gap-10">
        {data?.elections?.length > 0 && <Voting />}
        <CurrentMembers />
      </div>

      {data?.elections?.length > 0 && (
        <div className="fixed top-[17%] right-0 flex flex-col gap-4 z-50 -translate-y-1/2">
          <StickyButton
            title="Nominations"
            Icon={FaUserPlus}
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

const StickyButton = ({ title, Icon, onClick }) => (
  <div className="relative group">
    <button
      onClick={onClick}
      className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-l-full shadow-lg"
    >
      <Icon className="text-xl" />
    </button>
    <span className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-3 py-1 rounded-l-md text-sm font-medium shadow-md opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-right whitespace-nowrap">
      {title}
    </span>
  </div>
);

export default Members;
