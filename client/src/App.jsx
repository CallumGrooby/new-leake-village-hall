import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import { GetBookings } from "./GetBookings";
import { Calendar } from "./components/booking-calendar/Calendar";
import { Navigation } from "./components/Navigation";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
function App() {
  // const { data: bookings, loading, error } = GetBookings();
  // if (loading) return <p>Loading bookings...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  // if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div className="min-h-screen flex flex-col ">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
