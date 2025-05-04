import React, { useRef, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dummy from "../assets/dummy.jpeg";
import { FaPenAlt } from "react-icons/fa";
import { VscEyeClosed } from "react-icons/vsc";
import { notifyError, notifySuccess } from "../toast";
import { useMutation } from "@tanstack/react-query";
import { editUser, editStudent, uploadImage } from "../api";
import Loader from "./Loader";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: "-50%" },
  visible: {
    opacity: 1,
    scale: 1,
    y: "0%",
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: "-30%",
    transition: { duration: 0.2 },
  },
};

const Details = memo(({ label, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold w-[50px] text-gray-500">{label}:</span>
      <span className={`${label === "Role" && "capitalize"}`}>{value}</span>
    </div>
  );
});

Details.displayName = "Details";

const useUserData = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

const ProfileModal = ({ onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const currentUser = useUserData();

  const { mutate: saveChanges, isPending } = useMutation({
    mutationFn: async (formData) => {
      const uploadRes = await uploadImage(formData);
      const imageUrl = uploadRes?.data?.imageUrl;
      if (!imageUrl) throw new Error("Image upload failed");

      const editFn = currentUser?.role === "student" ? editStudent : editUser;
      return await editFn(currentUser._id, { profileImg: imageUrl });
    },
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.user));
      notifySuccess("Profile updated successfully");
      setImage(null);
      onClose();
    },
    onError: () => {
      notifyError("Failed to update profile.");
    },
  });

  const handleIconClick = useCallback(() => {
    fileInputRef.current?.click();
    setEditMode(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!image) {
      notifyError("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    saveChanges(formData);
  }, [image, saveChanges]);

  const selectImage = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    onClose();
    setTimeout(() => {
      navigate("/login");
    }, 300);
  }, [navigate, onClose]);

  const navigateToDashboard = useCallback(() => {
    navigate("/dashboard");
    onClose();
  }, [navigate, onClose]);

  if (!currentUser) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md shadow">
          <p className="text-red-600">User not logged in.</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const profileImage = editMode
    ? preview || currentUser.profileImg || dummy
    : currentUser.profileImg || dummy;
    
  const showDashboardButton = currentUser.role === "council" || currentUser.role === "admin";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white rounded-md p-6 w-[35%] shadow-2xl relative border-2 border-black/50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
          >
            <VscEyeClosed />
          </button>
          
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Profile
          </h2>
          
          <div className="flex items-center mt-4 gap-4">
            <div className="w-fit h-full relative">
              <img
                src={profileImage}
                alt="Profile"
                className="h-24 w-24 rounded-md object-cover"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={selectImage}
              />
              <button
                onClick={handleIconClick}
                className="absolute -right-1 -bottom-1 bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:scale-95"
              >
                <FaPenAlt className="scale-75" />
              </button>
            </div>
            
            <div className="space-y-2 text-gray-700 text-base w-[75%]">
              <Details label="Name" value={currentUser.name} />
              <Details label="Email" value={currentUser.email} />
              <Details label="Role" value={currentUser.role} />
            </div>
          </div>

          {image ? (
            <button
              onClick={handleSave}
              className="w-full py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200 mt-4 h-10 flex justify-center items-center"
              disabled={isPending}
            >
              {isPending ? <Loader /> : "Save Changes"}
            </button>
          ) : (
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Log Out
              </button>
              
              {showDashboardButton && (
                <button
                  onClick={navigateToDashboard}
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Dashboard
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;