import React from "react";
import { ArrowRightIcon } from "../assets/icons/Icons";
import { ContactDetails } from "../data/ContactDetails";
const contactIcons = ContactDetails;

export const ContactUsSection = () => {
  return (
    <section className="bg-primary-200 text-background">
      <article className="container mx-auto min-h-[526px] flex flex-row items-center">
        <div className="flex flex-col gap-4 justify-center h-full basis-1/3">
          <h2 className="text-2xl">GET IN TOUCH</h2>

          <ul>
            {contactIcons.map((iconedInfo, i) => (
              <li key={i} className="flex flex-row gap-2">
                {iconedInfo.icon}
                {iconedInfo.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="grow">
          <h1>hello</h1>
        </div>
      </article>
    </section>
  );
};
