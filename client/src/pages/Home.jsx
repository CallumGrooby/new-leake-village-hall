import React from "react";
import { ArrowRightIcon, CalendarIcon } from "../assets/icons/Icons";
import { HeroSection } from "../components/HeroSection";
import { EventsSection } from "../components/EventsSection";
import { AboutUsSection } from "../components/AboutUsSection";
import { ContactUsSection } from "../components/ContactUsSection";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <EventsSection />
      <AboutUsSection />
      <ContactUsSection />
    </div>
  );
};
