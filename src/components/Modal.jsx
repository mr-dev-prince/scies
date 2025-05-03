import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-xl"
            initial={{ scale: 0.8, y: "-50%" }}
            animate={{ scale: 1, y: "0%" }}
            exit={{ scale: 0.8, y: "-30%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-white bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded-md"
            >
              Close
            </button>
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
              {title}
            </h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
