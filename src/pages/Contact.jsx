import React from "react";
import { motion } from "framer-motion";
import { Logo } from "../constants/images";

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
  return (
    <div className="pt-[10vh] h-screen flex justify-center items-center">
      <motion.form
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="w-[30%] flex flex-col gap-3 p-4 border-2 border-black/50 rounded-md"
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
            required
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          >
            <option value="" disabled>Select Category</option>
            <option value="query">General Query</option>
            <option value="grievance">Grievance</option>
            <option value="suggestion">Suggestion</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="font-semibold text-gray-600">
            Message
          </label>
          <textarea
            required
            rows={4}
            placeholder="Write your message here..."
            className="w-full border-2 border-gray-400 font-semibold rounded-md indent-2 p-2 focus:border-blue-700 outline-none resize-none"
          ></textarea>
        </div>

        <button
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
