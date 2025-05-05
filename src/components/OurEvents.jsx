import React, { useState } from "react";
import EventFilter from "./EventFilter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, getEvents } from "../api";
import { format } from "date-fns";
import Loader from "./Loader";
import { notifyError, notifySuccess } from "../toast";
import { MdDelete } from "react-icons/md";

const OurEvents = () => {
  const [selectedType, setSelectedType] = useState("cultural");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleFilterClick = (type) => {
    setSelectedType(type);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 1000,
    onError: () => {
      notifyError("Failed to fetch events.");
    },
  });

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      notifySuccess("Event deleted successfully");
      window.location.reload();
    },
    onError: () => {
      notifyError("Failed to delete event");
    },
  });

  const handleDelete = (eventId) => {
    mutate(eventId);
  };

  console.log("data--> ",data);

  const events = data?.events || [];

  const filteredEvents = events.filter((event) => event.type === selectedType);

  console.log(filteredEvents);

  return (
    <div className="w-full h-fit px-4 md:px-8">
      <div className="flex justify-center items-center">
        <EventFilter
          selected={selectedType}
          handleFilterClick={handleFilterClick}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : filteredEvents.length === 0 ? (
        <p className="text-center mt-8 text-gray-600 font-medium text-lg">
          No events
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={format(new Date(event.date), "dd MMMM yyyy")}
              description={event.description}
              src={event.imageUrl}
              onDelete={() => handleDelete(event._id)}
              deleteEnabled={
                currentUser?.role === "admin" || currentUser?.role === "council"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EventCard = ({
  title,
  date,
  description,
  src,
  onDelete,
  deleteEnabled,
}) => {
  return (
    <div className="bg-white/50 shadow-md rounded-md p-4 mb-4 flex flex-col md:flex-row h-auto md:h-[50vh] w-full gap-4 relative">
      {deleteEnabled && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 text-red-500 bg-white p-2 rounded-md cursor-pointer hover:scale-110 duration-200"
        >
          <MdDelete size={16} />
        </button>
      )}
      <div className="w-full md:w-[50%] h-48 md:h-full">
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-start w-full md:w-[50%]">
        <h3 className="font-semibold cal-sans text-xl md:text-3xl tracking-wide">
          {title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base">{date}</p>
        <p className="mt-2 text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default OurEvents;
