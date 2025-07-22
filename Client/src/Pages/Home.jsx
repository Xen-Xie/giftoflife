import React from "react";
import Hero from "../Components/Hero";
import LiveStats from "../Components/LiveStats";
import MedicalTips from "../Components/MediTips";
import HowItWorks from "../Components/HowItWorks";
import IncidentCarousel from "../Components/IncidentCarousel";

function Home() {
  return (
    <div className="">
      <IncidentCarousel />
      <Hero />
      <LiveStats />
      <MedicalTips />
      <HowItWorks />
    </div>
  );
}

export default Home;
