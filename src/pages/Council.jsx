import React, { useState } from "react";
import CurrentMembers from "../components/CurrentMembers";
import Modal from "../components/Modal";
import { FaUserPlus } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { createMember } from "../api";
import Loader from "../components/Loader";
import { notifyError, notifySuccess } from "../toast";
import StickyButton from "../components/StickyButton";
import { POSITION_GROUPS } from "../constants/formData";

const Council = () => {
  const [activeModal, setActiveModal] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [memberData, setMemberData] = useState({
    enrollmentNumber: "",
    position: "",
  });

  const { mutate: mutateAddMember, isLoading: isAddingMember } = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      notifySuccess("Member added successfully.");
      closeModal();
    },
    onError: (error) => {
      notifyError(error.response?.data?.message || "Failed to add member.");
    },
  });

  const closeModal = () => setActiveModal(null);

  const handleAddMemberInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberData.enrollmentNumber || !memberData.position) {
      notifyError("Please fill in all fields");
      return;
    }
    mutateAddMember(memberData);
  };

  const renderAddMemberForm = () => (
    <form onSubmit={handleAddMemberSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="enrollmentNumber"
        value={memberData.enrollmentNumber}
        onChange={handleAddMemberInputChange}
        placeholder="Enrollment Number"
        className="border p-2 rounded input-uppercase"
        required
      />

      <select
        name="position"
        value={memberData.position}
        onChange={handleAddMemberInputChange}
        className="border p-2 rounded"
        required
      >
        <option value="" disabled>
          Select Position
        </option>
        {Object.entries(POSITION_GROUPS).map(([group, positions]) => (
          <optgroup key={group} label={group}>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 h-10 flex justify-center items-center disabled:opacity-60"
        disabled={isAddingMember}
      >
        {isAddingMember ? <Loader /> : "Add Member"}
      </button>
    </form>
  );

  return (
    <>
      <div className="h-fit min-h-screen flex flex-col gap-10">
        <CurrentMembers />
      </div>
      <div className="fixed top-[22%] right-0 flex flex-col gap-4 z-50 -translate-y-1/2">
        {currentUser && currentUser?.role !== "student" && (
          <StickyButton
            title="Add Member"
            Icon={FaUserPlus}
            onClick={() => setActiveModal("addMember")}
          />
        )}
      </div>
      <Modal
        isOpen={activeModal === "addMember"}
        onClose={closeModal}
        title="Add Member"
      >
        {renderAddMemberForm()}
      </Modal>
    </>
  );
};

export default Council;
