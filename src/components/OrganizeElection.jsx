import React, { useRef, useState } from "react";
import { notifyError, notifySuccess } from "../toast";
import { createElection, uploadImage } from "../api";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";

const OrganizeElection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    nominationCloseDate: "",
    positions: [{ title: "", maxCandidates: 1 }],
    imageUrl: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePositionChange = (index, field, value) => {
    const updatedPositions = [...form.positions];
    updatedPositions[index][field] =
      field === "maxCandidates" ? Number(value) : value;
    setForm((prev) => ({ ...prev, positions: updatedPositions }));
  };

  const addPosition = () => {
    setForm((prev) => ({
      ...prev,
      positions: [...prev.positions, { title: "", maxCandidates: 1 }],
    }));
  };

  const removePosition = (index) => {
    const updatedPositions = form.positions.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, positions: updatedPositions }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSuccess: async (data) => {
      const imageUrl = data.data.imageUrl;
      const updatedForm = {
        ...form,
        imageUrl,
      };
      setForm(updatedForm);
      const res = createElection(updatedForm);
      if (res.error) {
        notifyError("Failed to create election.");
        return;
      }
      notifySuccess("Election created successfully");
      setForm({
        name: "",
        description: "",
        startDate: "",
        positions: [{ title: "", maxCandidates: 1 }],
        imageUrl: null,
      });
      setImage(null);
      setPreview(null);
    },
    onError: (error) => {
      notifyError(
        error?.response?.data?.message || "Failed to create election."
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      form.name === "" ||
      form.description === "" ||
      form.startDate === "" ||
      form.positions.length === 0 ||
      form.positions.some(
        (pos) => pos.title === "" || pos.maxCandidates <= 0
      ) ||
      !image
    ) {
      notifyError("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    mutate(formData);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-md shadow-md w-full mt-2 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Election Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Election Description"
          className="w-full border p-2 rounded"
          rows={3}
          required
        />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="startDate"
              className="block mb-1 text-sm font-medium"
            >
              Election Date
            </label>
            <input
              placeholder="Start Date"
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="nominationCloseDate"
              className="block mb-1 text-sm font-medium"
            >
              Nomination Close Date
            </label>
            <input
              placeholder="Nomination Close Date"
              type="date"
              name="nominationCloseDate"
              value={form.nominationCloseDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Positions</h3>
          {form.positions.map((pos, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 items-start sm:items-center bg-slate-100 p-2 rounded-md shadow-sm"
            >
              <input
                type="text"
                value={pos.title}
                onChange={(e) =>
                  handlePositionChange(index, "title", e.target.value)
                }
                placeholder="Position Title"
                className="flex-1 border p-2 rounded w-full"
                required
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label
                  htmlFor={`maxCandidates-${index}`}
                  className="whitespace-nowrap"
                >
                  Max Candidates
                </label>
                <input
                  type="number"
                  min={1}
                  value={pos.maxCandidates}
                  onChange={(e) =>
                    handlePositionChange(index, "maxCandidates", e.target.value)
                  }
                  className="w-full sm:w-24 border p-2 rounded"
                  required
                />
              </div>
              {form.positions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePosition(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:scale-95"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={addPosition}
              className="w-full sm:w-[200px] py-2 rounded text-white bg-blue-600 hover:scale-95"
            >
              + Add Position
            </button>
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-full sm:w-[200px] bg-blue-600 text-white px-3 py-2 rounded shadow hover:scale-95"
            >
              {image ? "Change Image" : "Select Image"}
            </button>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-full sm:w-[70%] h-[40vh] object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 w-full text-white px-4 py-3 mt-6 font-semibold rounded hover:bg-green-700 duration-200 flex justify-center items-center"
        >
          {isPending ? <Loader /> : "Create Election"}
        </button>
      </form>
    </div>
  );
};

export default OrganizeElection;
