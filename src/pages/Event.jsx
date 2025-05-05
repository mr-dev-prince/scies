import React, { useState } from "react";
import OurEvents from "../components/OurEvents";
import { IoAddCircleSharp } from "react-icons/io5";
import AddEventModal from "../components/AddEventModal";

const Event = () => {
  const [showModal, setShowModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const addEventEnabled =
    (currentUser &&
      (currentUser.role === "admin" || currentUser.role === "council")) ||
    true;

  return (
    <div className="h-fit flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
      <div className="flex flex-col justify-center items-center h-screen pt-[10vh] text-center">
        <p className="font-semibold cal-sans text-[3.5vh] sm:text-[4vh]">
          Student Council Presents
        </p>
        <h1 className="font-semibold cal-sans text-[8vh] sm:text-[10vh] md:text-[15vh] tracking-wider">
          OUR EVENTS
        </h1>
      </div>
      <OurEvents />
      {addEventEnabled && <AddEventButton onClick={() => setShowModal(true)} />}
      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

const AddEventButton = ({ onClick }) => {
  return (
    <div className="fixed right-4 md:right-0 top-[20%] sm:top-[25%] z-50">
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-l-full flex gap-1 sm:gap-2 justify-center items-center text-sm sm:text-base hover:scale-95 duration-200 shadow-lg"
      >
        <IoAddCircleSharp className="text-lg sm:text-xl" />
        <p className="font-semibold">Add Event</p>
      </button>
    </div>
  );
};

export default Event;
