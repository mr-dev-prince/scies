import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import Loader from "../components/Loader";
import AllContacts from "../components/AllContacts";
import AllElections from "../components/AllElections";

const NominationRequests = lazy(() =>
  import("../components/NominationRequests")
);
const UserVerifications = lazy(() => import("../components/UserVerification"));
const OrganizeElection = lazy(() => import("../components/OrganizeElection"));
const MemberVerification = lazy(() =>
  import("../components/MemberVerification")
);

const SectionButton = ({ title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="mb-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-between items-center"
  >
    <p className="font-semibold text-xl">{title}</p>
    {isActive ? <FaCaretDown size={24} /> : <FaCaretRight size={24} />}
  </button>
);

const SectionContent = ({ isActive, sectionKey, children }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        key={sectionKey}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        transition={{ duration: 0.3 }}
      >
        <Suspense
          fallback={
            <div className="p-4 flex justify-center items-center">
              <Loader />
            </div>
          }
        >
          {children}
        </Suspense>
      </motion.div>
    )}
  </AnimatePresence>
);

const sectionVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: { opacity: 1, height: "auto", overflow: "visible" },
  exit: { opacity: 0, height: 0, overflow: "hidden" },
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("nomination");

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const sections = [
    {
      key: "nomination",
      title: "Nomination Requests",
      component: <NominationRequests />,
    },
    {
      key: "verification",
      title: "User Approval",
      component: <UserVerifications />,
    },
    {
      key: "memberApproval",
      title: "Member Approval : Council",
      component: <MemberVerification />,
    },
    {
      key: "election",
      title: "Organize Election",
      component: <OrganizeElection />,
    },
    {
      key: "contact",
      title: "Contact Requests",
      component: <AllContacts />,
    },
    {
      key: "electionlist",
      title: "Election List",
      component: <AllElections />,
    },
  ];

  return (
    <div className="min-h-screen p-6 pt-[12vh]">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 cal-sans tracking-wider w-full border-2 rounded-md text-center py-2 border-black/50">
        Admin Dashboard
      </h1>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.key}>
            <SectionButton
              title={section.title}
              isActive={activeSection === section.key}
              onClick={() => toggleSection(section.key)}
            />
            <SectionContent
              isActive={activeSection === section.key}
              sectionKey={section.key}
            >
              {section.component}
            </SectionContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
