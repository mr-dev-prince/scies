import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { notifyError, notifySuccess } from "../toast";
import { createEvent, uploadImage } from "../api";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";

const AddEventModal = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSuccess: async (data) => {
      const res = await createEvent({
        title: form.title,
        description: form.description,
        date: form.date,
        type: form.type,
        imageUrl: data.data.imageUrl,
      });
      if (res.error) {
        console.log(res.error);
        notifyError("Failed to create event.");
        return;
      }
      notifySuccess("Event created successfully");
      setForm({
        title: "",
        description: "",
        date: "",
        type: "",
      });
      setImage(null);
      setPreview(null);
      onClose();
    },
    onError: (error) => {
      notifyError("Failed to create event.");
    },
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      notifyError("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl hover:text-red-600"
        >
          <IoClose />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <select
            onChange={handleInputChange}
            defaultValue={""}
            className="border p-2 rounded"
          >
            <option value="" disabled>
              Select Event Type
            </option>
            <option value="cultural">Cultural</option>
            <option value="technical">Technical</option>
            <option value="sports">Sports</option>
            <option value="Management">Management</option>
            <option value="Social">Social</option>
            <option value="other">Other</option>
          </select>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded w-fit">
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-[25vh] rounded border mt-2 object-cover"
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 h-10 flex justify-center items-center"
          >
            {isPending ? <Loader /> : "Submit Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
