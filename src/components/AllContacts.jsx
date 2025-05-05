import React from "react";
import { getContacts } from "../api";
import { notifyError } from "../toast";
import { useQuery } from "@tanstack/react-query";

const AllContacts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    onError: (error) => {
      notifyError("Failed to fetch contacts", error?.message);
    },
  });

  console.log(data);
  return (
    <div className="flex h-fit bg-gray-100/50 p-2 rounded-md">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full max-w-md">
          {data?.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};

const ContactCard = ({ contact }) => {
  const { name, email, category, message } = contact;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col gap-2">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 bg-gray-500/50 w-fit px-2 py-1 rounded-md">
        {email}
      </p>
      <p className="text-gray-600 capitalize  w-fit py-1 rounded-md">
        <span className="bg-sky-300 px-2 py-1 rounded-md mr-2">Category :</span>
        {category}
      </p>
      <p className="text-gray-800">
        <span className="bg-sky-300 px-2 py-1 rounded-md mr-2">Message :</span>
        {message}
      </p>
    </div>
  );
};

export default AllContacts;
