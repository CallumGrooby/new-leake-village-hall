import React from "react";
import { ContactDetails } from "../data/ContactDetails";
import { Link } from "react-router-dom";

const contactIcons = ContactDetails;
const links = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Bookings", link: "/bookings" },
  { name: "Contact", link: "/contact" },
];
export const Footer = () => {
  return (
    <footer className="bg-primary-200 text-background text-xl">
      <div
        className="container w-full mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 pt-4 pb-4"
        style={{
          gridTemplateRows: "30px auto",
        }}
      >
        {/* Title */}
        <Link
          to={"/"}
          className="
          flex items-start justify-start 
          text-3xl font-semibold font-mulish text-primary-200-200 hover:text-accent transition"
        >
          EMNL Village Hall
        </Link>

        {/* Nav bar */}

        <nav className="flex items-start md:justify-end ">
          <ul className="flex flex-row gap-8">
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.link}
                  className="font-semibold font-mulish text-primary-200-200 hover:text-accent transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info */}

        <ul className="flex items-start justify-end flex-col gap-2">
          {contactIcons.map((iconedInfo, i) => (
            <li key={i} className="flex flex-row gap-2">
              {iconedInfo.icon}
              {iconedInfo.text}
            </li>
          ))}
        </ul>

        {/* Charity Number */}
        <p className="flex items-end justify-end text-accent">521917</p>
      </div>
    </footer>
  );
};
