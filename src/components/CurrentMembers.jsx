import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api";
import { notifyError } from "../toast";
import MemberCard from "./MemberCard";
import { motion } from "framer-motion";

const POSITION_GROUPS = {
  Core: ["President", "Vice President", "Representative"],
  Cultural: [
    "Cultural Secretary",
    "Cultural Vice Secretary",
    "Cultural Coordinator",
  ],
  Discipline: [
    "Discipline Secretary",
    "Discipline Vice Secretary",
    "Discipline Cultural Coordinator",
    "Discipline Coordinator",
  ],
  "Women Cell": [
    "Women Cell Secretary",
    "Women Cell Vice Secretary",
    "Women Cell Coordinator",
  ],
  Treasury: [
    "Treasury Secretary",
    "Treasury Vice Secretary",
    "Treasury Coordinator",
  ],
  Media: ["Media Secretary", "Media Vice Secretary", "Media Coordinator"],
  Sport: ["Sport Secretary", "Sport Vice Secretary", "Sport Coordinator"],
  "Event Management": [
    "Event Management Secretary",
    "Event Management Vice Secretary",
    "Event Management Coordinator",
  ],
};

const normalize = (str) => str?.trim().toLowerCase();

const CurrentMembers = () => {
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
    refetchOnWindowFocus: false,
    onError: () => {
      notifyError("Failed to fetch members.");
    },
  });

  const positionToGroup = {};
  for (const [group, positions] of Object.entries(POSITION_GROUPS)) {
    positions.forEach((pos) => {
      positionToGroup[normalize(pos)] = group;
    });
  }

  const groupedMembers = {};
  data?.forEach((member) => {
    const group = positionToGroup[normalize(member.position)];
    if (!group) return;
    if (!groupedMembers[group]) groupedMembers[group] = [];
    groupedMembers[group].push(member);
  });

  return (
    <>
      <motion.div
        className="text-center px-6 sm:px-16 h-screen flex justify-center items-center flex-col gap-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl uppercase tracking-wider md:text-6xl font-bold cal-sans bg-gradient-to-r from-cyan-500 via-indigo-900 to-cyan-500 text-transparent bg-clip-text">
          The Council
        </h1>
        <motion.p
          className="text-lg sm:text-xl mt-4 max-w-3xl mx-auto tracking-wide font-semibold"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Meet the vibrant minds and dedicated leaders of our Student Council —
          a diverse collective working across disciplines to enrich campus life,
          foster creativity, and ensure every voice is heard.
        </motion.p>
      </motion.div>
      <div className="w-full flex flex-col gap-14 px-6 sm:px-16 py-10">
        {Object.entries(POSITION_GROUPS).map(([group]) => {
          const members = groupedMembers[group];
          if (!members || members.length === 0) return null;

          return (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-white bg-gradient-to-r from-cyan-500 via-indigo-900 to-cyan-500 py-3 rounded-md shadow-md">
                {group}
              </h2>
              <div className="flex flex-wrap gap-5 justify-center bg-gray-700/40 py-4 rounded-md">
                {members.map((member) => (
                  <MemberCard key={member._id} member={member} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default CurrentMembers;
