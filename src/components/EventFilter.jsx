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
      } px-12 text-white py-2 rounded-md hover:bg-red-700 duration-300 capitalize`}
    >
      {title}
    </button>
  );
};

const EventFilter = ({ handleFilterClick, selected }) => {
  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-500 p-2 rounded-md gap-4">
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
