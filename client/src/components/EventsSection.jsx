import React from "react";
import tempImage from "../assets/placeholder.png";
import { ArrowRightIcon } from "../assets/icons/Icons";

const events = [
  {
    name: "Coffee morning",
    image: tempImage,
    text: "Come join us for our coffee morning every monday",
    link: "/events",
  },
  {
    name: "Coffee morning",
    image: tempImage,
    text: "Come join us for our coffee morning every monday",
    link: "/events",
  },
  {
    name: "Coffee morning",
    image: tempImage,
    text: "Come join us for our coffee morning every monday",
    link: "/events",
  },
  {
    name: "Coffee morning",
    image: tempImage,
    text: "Come join us for our coffee morning every monday",
    link: "/events",
  },
  {
    name: "Coffee morning",
    image: tempImage,
    text: "Come join us for our coffee morning every monday",
    link: "/events",
  },
];

export const EventsSection = () => {
  return (
    <section>
      <ul className="flex flex-col md:flex-row h-auto md:h-[532px] w-full overflow-hidden">
        {events.map((event, i) => (
          <li
            key={i}
            className="group relative h-[200px] md:h-auto md:flex-1 bg-center bg-cover transition-all duration-500 ease-in-out md:hover:flex-[3] cursor-pointer"
            style={{ backgroundImage: `url(${event.image})` }}
          >
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Desktop */}
            <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 text-lg text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <h2 className="">{event.name}</h2>

              <div className="max-h-0 md:max-h-0 overflow-hidden opacity-0 group-hover:max-h-40 md:group-hover:max-h-40 group-hover:opacity-100 md:group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto flex flex-row justify-between items-end">
                <p className="mt-2">More Info about the event</p>
                <button className="p-2 bg-primary-200 text-accent">
                  <ArrowRightIcon size={32} />
                </button>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <div className="flex flex-row justify-between items-end">
                <span>
                  <h2 className="text-lg">{event.name}</h2>
                  <p className=" text-sm">More Info about the event</p>
                </span>

                <button className="p-2 bg-primary-200 text-accent">
                  <ArrowRightIcon size={32} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
