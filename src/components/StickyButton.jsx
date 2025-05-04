import React from "react";

const StickyButton = ({ title, Icon, onClick }) => {
  return (
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
};

export default StickyButton;
