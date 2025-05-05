import React from "react";
import { motion } from "framer-motion";
import { Logo } from "../constants/images";
import { createContact } from "../api";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../toast";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: createContact,
    onSuccess: (data) => {
      notifySuccess("Message sent successfully.");
      setFormData({
        name: "",
        email: "",
        category: "",
        message: "",
      });
    },
    onError: (error) => {
      notifyError("Failed to send message", error?.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const { name, email, category, message } = formData;
    if (!name || !email || !category || !message) {
      notifyError("Please fill all fields");
      return;
    }
    mutate(formData);
  };

  return (
    <div className="pt-[10vh] h-fit md:h-screen flex justify-center items-center p-2">
      <motion.form
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[30%] flex flex-col gap-3 p-4 border-2 border-black/50 rounded-md mt-4 md:mt-0"
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <img src={Logo.logo} alt="logo" className="h-24" />
          <p className="text-2xl font-semibold text-center w-full uppercase text-gray-600">
            Contact Us
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-gray-600">
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
            placeholder="Enter your name"
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-gray-600">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="Enter your email"
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-semibold text-gray-600">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="query">General Query</option>
            <option value="grievances">Grievance</option>
            <option value="suggestion">Suggestion</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="font-semibold text-gray-600">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Write your message here..."
            className="w-full border-2 border-gray-400 font-semibold rounded-md indent-2 p-2 focus:border-blue-700 outline-none resize-none"
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          type="submit"
          className="w-full py-1 bg-blue-700 rounded-md text-white"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default Contact;
