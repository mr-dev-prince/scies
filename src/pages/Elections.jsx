import React, { useMemo, useState } from "react";
import Voting from "../components/Voting";
import Modal from "../components/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { notifyError, notifySuccess } from "../toast";
import { HiDocumentAdd } from "react-icons/hi";
import StickyButton from "../components/StickyButton";
import { createNomination, getAllElections } from "../api";

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
        {isLoading ? <Loader /> : "Submit Nomination"}
      </button>
    </form>
  );

  return (
    <>
      <div className="h-fit pt-[12vh] flex flex-col gap-10">
        {data?.elections?.length > 0 && <Voting />}
      </div>

      {data?.elections?.length > 0 && (
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
