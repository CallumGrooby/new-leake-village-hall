import React, { useMemo, useState } from "react";
import { useBookingsOnMonth } from "./GetBookingsOnMonth";
import styles from "./Calendar.module.css";

export const Calendar = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(10); // example: October 2025

  const {
    data: bookings,
    loading,
    error,
  } = useBookingsOnMonth({ month, year });

  console.log("Bookings for", month, year, bookings);

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

  //Get offset for the first day
  const firstDay = new Date(year, month - 1, 1);
  const startDay = firstDay.getDay(); // 0 = Sunday
  const offset = (startDay + 6) % 7; // shift to make Monday=0

  const [selectedBox, setSelectedBox] = useState(null);
  const handleSelect = (index) => setSelectedBox(index);

  const bookingsByDay = useMemo(() => {
    const map = new Map();
    bookings?.forEach((booking) => {
      const key = new Date(booking.date).toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(booking);
    });

    // Sort bookings in each day by start time
    for (const arr of map.values()) {
      arr.sort((a, b) => {
        const aTime = new Date(`${a.date.slice(0, 10)}T${a.startTime}:00Z`);
        const bTime = new Date(`${b.date.slice(0, 10)}T${b.startTime}:00Z`);
        return aTime - bTime;
      });
      console.log("Sorted bookings for day:", arr);
    }
    return map;
  }, [bookings]);

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(2000, i).toLocaleString("default", { month: "long" })
  );

  function goPrevMonth() {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else {
      setMonth((m) => m - 1);
    }
  }
  function goNextMonth() {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else {
      setMonth((m) => m + 1);
    }
  }
  function jumpToToday() {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
  }

  return (
    <div className={`${styles.calendar} basis-3/4 grow`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h1>

        {/* Quick prev/next month controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrevMonth}
            className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm
                 hover:bg-accent active:bg-accent focus:outline-none focus:ring-2 focus:ring-primary-100"
            aria-label="Previous month"
            title="Previous month"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12.293 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 1 1 1.414 1.414L8.414 10l3.879 3.879a1 1 0 0 1 0 1.414z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNextMonth}
            className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm
                 hover:bg-accent active:bg-accent focus:outline-none focus:ring-2 focus:ring-primary-100"
            aria-label="Next month"
            title="Next month"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7.707 4.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L11.586 10 7.707 6.121a1 1 0 0 1 0-1.828z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Controls bar */}
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-lg border-2 border-black bg-white p-4 shadow-sm">
        {/* Year input */}
        <div className="flex flex-col">
          <label
            htmlFor="year"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <input
            id="year"
            type="number"
            inputMode="numeric"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-32 rounded-sm border-2 border-black px-3 py-2 text-sm
                 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <p className="mt-1 text-xs text-gray-500">Type a year</p>
        </div>

        {/* Month select (clearer than typing 1–12) */}
        <div className="flex flex-col">
          <label
            htmlFor="month"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Month
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-48 rounded-sm border-2 border-black px-3 py-2 text-sm
                 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            {monthNames.map((name, i) => (
              <option key={name} value={i + 1}>
                {i + 1} — {name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">Pick a month</p>
        </div>

        {/* Today shortcut (styled like your CTA palette) */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={jumpToToday}
            className="inline-flex items-center rounded-sm border-2 border-black bg-primary-200
                 px-3 py-2 text-sm font-medium text-background hover:bg-accent hover:text-text
                 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Today
          </button>
        </div>
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
        {/* leading blanks to align first row */}
        {Array.from({ length: offset }).map((_, i) => (
          <li key={`empty-${i}`} className={styles.empty} />
        ))}

        {/* day boxes */}
        {daysInSelectedMonth.map((date, i) => {
          const key = date.toDateString();
          const dayBookings = bookingsByDay.get(key) ?? [];
          return (
            <CalendarBox
              key={key}
              date={date}
              bookings={dayBookings}
              isSelected={selectedBox === i}
              onSelect={() => handleSelect(i)}
            />
          );
        })}
      </ol>
    </div>
  );
};

const CalendarBox = ({ date, bookings, isSelected, onSelect }) => {
  const hasBooking = bookings.length > 0;

  return (
    <li
      onClick={onSelect}
      className={`flex flex-col h-[12vw] max-h-[125px]
                  transition-colors hover:bg-sky-50 ${
                    isSelected ? "bg-skyblue-200" : "bg-white"
                  }`}
      style={{ backgroundColor: isSelected ? "skyblue" : "white" }} // keep your original highlight
    >
      <span className="block text-base size-6 bg-primary-200 text-white text-center rounded-br-sm">
        {date.getDate()}
      </span>

      <div className="mt-1 flex-1 overflow-y-auto ">
        {hasBooking && (
          <div className="text-sm">
            {bookings.map((b, idx) => {
              const start = b.startTime;
              const end = b.finishTime;

              let label = "Booked";
              if (start && end) label = `${start}–${end}`;
              else if (start) label = `${start}`;

              return (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-accent mb-px pl-5 text-text border-dashed border border-black"
                >
                  <span className="bg-white  w-full">{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
};
