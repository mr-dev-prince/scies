import React, { useState } from "react";
import { Logo } from "../constants/images";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent, registerUser } from "../api";
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { notifyError, notifyInfo, notifySuccess } from "../toast";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enrollmentNumber: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return formData.role === "student"
        ? await registerStudent(data)
        : await registerUser(data);
    },
    onSuccess: (data) => {
      if (data.user.role === "student") {
        notifySuccess("Registeration successful.");
        localStorage.setItem("student", JSON.stringify(data.user));
      } else {
        notifySuccess(
          "Registered successfully, please contact admin for approval."
        );
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        enrollmentNumber: "",
        role: "",
      });
      navigate("/");
      window.location.reload();
    },
    onError: (error) => {
      notifyError("Registration failed", error?.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "enrollmentNumber") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { role, name, email, password, enrollmentNumber } = formData;

    if (!role || !name || !email || !password) {
      notifyInfo("Please fill all the fields");
      return;
    }

    if (role === "student" && !enrollmentNumber) {
      notifyInfo("Enrollment number is required for students");
      return;
    }

    const payload =
      role === "student" || "council"
        ? { name, email, enrollmentNumber, password, role }
        : { name, email, password, role };

    mutation.mutate(payload);
  };

  return (
    <div className="pt-[10vh] h-screen flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] flex flex-col gap-4 p-4 border-2 border-black/50 rounded-md shadow-xl bg-white"
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <img src={Logo.logo} alt="Logo" className="h-24" />
          <p className="text-2xl font-semibold text-center uppercase text-gray-600">
            Register
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="font-semibold text-gray-600">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="council">Council</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-gray-600 capitalize">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>
        {formData.role === ("student" || "council") && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="enrollmentNumber"
              className="font-semibold text-gray-600"
            >
              Enrollment No
            </label>
            <input
              type="text"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              placeholder="Enter Enrollment Number"
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none input-uppercase"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-1 bg-blue-700 rounded-md text-white h-10 flex justify-center items-center"
        >
          {mutation.isPending ? <Loader /> : "Register"}
        </button>
        <Link
          to="/login"
          className="w-full text-center font-semibold text-gray-600"
        >
          Already have an account? <span className="text-blue-700">Login</span>
        </Link>
      </motion.form>
    </div>
  );
};

export default Register;
