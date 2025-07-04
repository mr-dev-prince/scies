import React from "react";
import {
  deleteContact,
  getContacts,
  rejectContact,
  resolveContact,
} from "../api";
import { notifyError, notifySuccess } from "../toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const AllContacts = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    onError: (error) => {
      notifyError("Failed to fetch contacts", error?.message);
    },
  });

  const { mutate: deleteContactMutation, isPending: deleting } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      notifySuccess("Contact deleted successfully");
      refetch();
    },
    onError: () => {
      notifyError("Failed to delete contact");
    },
  });

  const { mutate: resolveContactMutation, isPending: resolving } = useMutation({
    mutationFn: resolveContact,
    onSuccess: () => {
      notifySuccess("Contact resolved successfully");
      refetch();
    },
    onError: () => {
      notifyError("Failed to resolve contact");
    },
  });

  const { mutate: rejectContactMutation, isPending: rejecting } = useMutation({
    mutationFn: rejectContact,
    onSuccess: () => {
      notifySuccess("Contact rejected successfully");
      refetch();
    },
    onError: () => {
      notifyError("Failed to reject contact");
    },
  });

  const handleMutation = (contactId, action) => {
    if (action === "delete") {
      deleteContactMutation(contactId);
    } else if (action === "resolve") {
      resolveContactMutation(contactId);
    } else if (action === "reject") {
      rejectContactMutation(contactId);
    }
  };

  const loadingStatus = {
    deleting,
    resolving,
    rejecting,
  };

  return (
    <div className="flex h-fit bg-gray-100/50 p-2 rounded-md">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {data?.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              loadingStatus={loadingStatus}
              handleMutation={handleMutation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ContactCard = ({ contact, handleMutation, loadingStatus }) => {
  const { name, email, category, message, resolved } = contact;

  const getBgColor = (status) => {
    switch (status) {
      case 1:
        return "bg-green-200";
      case 0:
        return "bg-red-200";
      case 2:
        return "bg-yellow-200";
      default:
        return "bg-white";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 1:
        return "bg-green-600";
      case 0:
        return "bg-red-600";
      case 2:
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Resolved";
      case 0:
        return "Rejected";
      default:
        return "In Progress";
    }
  };

  return (
    <div
      className={`${getBgColor(
        contact?.resolved
      )} shadow-md rounded-md p-4 mb-4 flex flex-col gap-2 relative`}
    >
      <span
        className={`absolute right-4 top-2 border px-2 py-1 rounded-md ${getStatusBgColor(
          contact?.resolved
        )} text-white font-semibold`}
      >
        {getStatusText(contact?.resolved)}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className=" bg-gray-500/50 text-white w-fit px-2 py-1 rounded-sm">
          {email}
        </p>
        <p className="text-gray-800 capitalize  w-fit py-1 rounded-sm">
          <span className="bg-sky-300 px-2 py-1 rounded-sm mr-2">
            Category :
          </span>
          {category}
        </p>
        <p className="text-gray-800">
          <span className="bg-sky-300 px-2 py-1 rounded-sm mr-2">
            Message :
          </span>
          {message}
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          className="bg-gray-400 hover:bg-red-500 text-white font-semibold h-10 w-32 flex justify-center items-center rounded-md"
          onClick={() => handleMutation(contact._id, "delete")}
        >
          {loadingStatus.deleting ? <Loader /> : "Delete"}
        </button>
        <button
          disabled={contact?.resolved === 1}
          className="bg-gray-400 hover:bg-green-500 text-white font-semibold h-10 w-32 flex justify-center items-center rounded-md"
          onClick={() => handleMutation(contact._id, "resolve")}
        >
          {loadingStatus.resolving ? <Loader /> : "Resolve"}
        </button>
        <button
          disabled={contact?.resolved === 0}
          className="bg-gray-400 hover:bg-yellow-500 text-white font-semibold h-10 w-32 flex justify-center items-center rounded-md"
          onClick={() => handleMutation(contact._id, "reject")}
        >
          {loadingStatus.rejecting ? <Loader /> : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default AllContacts;
