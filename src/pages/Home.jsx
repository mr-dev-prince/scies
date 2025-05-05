import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Landing from "../components/Landing";
import AboutCouncil from "../components/AboutCouncil";
import CouncilInitiative from "../components/CouncilInitiative";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.state?.from === "login" ||
      location.state?.from === "register"
    ) {
      window.location.reload();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="font-sans min-h-screen">
      <Landing />
      <AboutCouncil />
      <CouncilInitiative />
    </div>
  );
};

export default Home;
