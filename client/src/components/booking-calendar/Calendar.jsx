import React, { useState } from "react";
import { useBookingsOnMonth } from "./GetBookingsOnMonth";
import styles from "./Calendar.module.css";

export const Calendar = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(11); // example: November 2025

  const {
    data: bookings,
    loading,
    error,
  } = useBookingsOnMonth({ month, year });

  const getDaysInMonth = (month, year) =>
    new Array(31)
      .fill("")
      .map((_, i) => new Date(year, month - 1, i + 1))
      .filter((d) => d.getMonth() === month - 1);

  const daysInSelectedMonth = getDaysInMonth(month, year);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // 🧮 Get offset for the first day
  const firstDay = new Date(year, month - 1, 1);
  const startDay = firstDay.getDay(); // 0 = Sunday
  const offset = (startDay + 6) % 7; // shift to make Monday=0

  const [selectedBox, setSelectedBox] = useState(null);

  const handleSelect = (index) => {
    setSelectedBox(index); // updates UI
    console.log(`Box ${index + 1} selected!`);
    // do something else here
  };
  return (
    <div className={styles.calendar}>
      <h1 className={styles.title}>
        {new Date(year, month - 1).toLocaleString("default", { month: "long" })}{" "}
        {year}
      </h1>

      <div className={styles.controls}>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </label>
        <label>
          Month:
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </label>
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      <ul className={styles.weekdays}>
        {weekDays.map((day) => (
          <li key={day}>
            <abbr title={day}>{day.slice(0, 3)}</abbr>
          </li>
        ))}
      </ul>

      <ol className={styles.dayGrid}>
        {/* Adds empty boxes to push the date to the correct day row */}
        {Array.from({ length: offset }).map((_, i) => (
          <li key={`empty-${i}`} className={styles.empty}></li>
        ))}
        {/* Shows the dates and if there is a booking */}
        {daysInSelectedMonth.map((date, i) => {
          const hasBooking = bookings?.some(
            (b) => new Date(b.date).toDateString() === date.toDateString()
          );
          return (
            <li
              onClick={() => handleSelect(i)}
              key={i}
              style={{
                color: hasBooking ? "green" : "black",
                backgroundColor: selectedBox === i ? "skyblue" : "white",
              }}
            >
              {date.toDateString()} {hasBooking && "✅ Booked"}{" "}
            </li>
          );
        })}{" "}
      </ol>
    </div>
  );
};
