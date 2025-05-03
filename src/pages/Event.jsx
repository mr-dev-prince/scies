import React, { useState } from "react";
import OurEvents from "../components/OurEvents";
import { IoAddCircleSharp } from "react-icons/io5";
import AddEventModal from "../components/AddEventModal";

const Event = () => {
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const addEventEnabled =
    (user && user.role === "admin") || user.role === "ceo";

  return (
    <div className="h-fit flex flex-col justify-center items-center px-6">
      <div className="flex flex-col justify-center items-center h-screen pt-[10vh]">
        <p className="font-semibold cal-sans text-[4vh]">
          Student Council Presents
        </p>
        <h1 className="font-semibold cal-sans text-[15vh] tracking-wider">
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
    <div className="fixed right-0 top-[20%] justify-center items-center hover:scale-95 duration-200">
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-l-full flex gap-2 justify-center items-center"
      >
        <IoAddCircleSharp />
        <p className="font-semibold">Add Event</p>
      </button>
    </div>
  );
};

export default Event;
