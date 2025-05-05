import React from "react";

const filter = [
  {
    id: "001",
    title: "cultural",
  },
  {
    id: "002",
    title: "sports",
  },
  {
    id: "003",
    title: "technical",
  },
  {
    id: "004",
    title: "management",
  },
  {
    id: "005",
    title: "social",
  },
];

const FilterButton = ({ title, handleFilterClick, isSelected }) => {
  return (
    <button
      onClick={() => handleFilterClick(title)}
      className={`${
        isSelected ? "bg-red-700" : "bg-gray-800"
      } text-white py-2 px-4 sm:px-8 md:px-12 rounded-md hover:bg-red-700 transition duration-300 capitalize text-sm sm:text-base`}
    >
      {title}
    </button>
  );
};


const EventFilter = ({ handleFilterClick, selected }) => {
  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-500 p-2 sm:p-3 rounded-md gap-2 sm:gap-4 w-full max-w-full overflow-x-auto">
      {filter.map((item) => (
        <FilterButton
          key={item.id}
          title={item.title}
          handleFilterClick={handleFilterClick}
          isSelected={selected === item.title}
        />
      ))}
    </div>
  );
};


export default EventFilter;
