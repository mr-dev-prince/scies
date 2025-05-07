import React, { useState } from "react";
import OurEvents from "../components/OurEvents";
import { IoAddCircleSharp } from "react-icons/io5";
import AddEventModal from "../components/AddEventModal";
import eventsBg from "../assets/GV8.JPG";

const Event = () => {
  const [showModal, setShowModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="h-fit flex flex-col justify-center items-center ">
      <div
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${eventsBg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
          <p className="font-semibold cal-sans text-[3.5vh] sm:text-[4vh]">
            Student Council Presents
          </p>
          <h1 className="font-semibold cal-sans text-[8vh] sm:text-[10vh] md:text-[15vh] tracking-wider">
            OUR EVENTS
          </h1>
        </div>
      </div>
      <div className="px-4 sm:px-6 md:px-8 mt-2 w-full">
        <OurEvents />
      </div>
      {currentUser && currentUser?.role !== "student" && (
        <AddEventButton onClick={() => setShowModal(true)} />
      )}
      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

const AddEventButton = ({ onClick }) => {
  return (
    <div className="fixed right-0 top-[20%] sm:top-[25%] z-50">
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
