import React from "react";
import { ArrowRightIcon } from "../assets/icons/Icons";
import tempImage from "../assets/placeholder.png";

import { motion } from "motion/react";

export const About = () => {
  return (
    <section>
      <HeroSection />
      <FacilitiesSection />
    </section>
  );
};

const HeroSection = () => {
  const IconedListElements = [
    {
      icon: <ArrowRightIcon className={"text-accent"} size={36} />,
      text: "13m × 5m with seating for up to 80 people",
    },
    {
      icon: <ArrowRightIcon className={"text-accent"} size={36} />,
      text: "Wooden floor suitable for dancing or exercise classes",
    },
    {
      icon: <ArrowRightIcon className={"text-accent"} size={36} />,
      text: "Tables and chairs included",
    },
    {
      icon: <ArrowRightIcon className={"text-accent"} size={36} />,
      text: "Sound system available",
    },
  ];

  return (
    <section className="bg-primary-200">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 text-background md:py-2 min-h-[600px]">
        <article className="basis-1/2 flex flex-col gap-4 justify-center">
          <h2 className="text-2xl font-mulish font-bold text-center md:text-start mt-16 md:mt-0 mb-4">
            Our Facilities for Hire
          </h2>
          <p>
            Discover the spaces that make Eastville, Midville & New Leake
            Village Hall the perfect venue for every occasion from family
            celebrations and community events to meetings and coffee mornings.
            Our village hall offers three versatile spaces available to hire
            each equipped and maintained to make your event run smoothly.
            Whether you need a large hall for a party, a kitchen for catering,
            or a bar for evening functions, we have everything you need in one
            welcoming venue.
          </p>

          <ul className="flex items-start justify-end flex-col gap-2">
            {IconedListElements.map((iconInfo, i) => (
              <li key={i} className="flex flex-row gap-2">
                {iconInfo.icon}
                {iconInfo.text}
              </li>
            ))}
          </ul>
        </article>

        <article className="grow basis-0 flex items-center justify-center px-4 mb-16 md:mb-0">
          <img src={tempImage} alt="" srcset="" />
        </article>
      </div>
    </section>
  );
};

const FacilitiesSection = () => {
  const facilities = [
    {
      title: "Main Hall",
      description:
        "A spacious hall perfect for large gatherings, events, and activities.",
      icons: [
        {
          icon: <ArrowRightIcon className={"text-accent"} size={24} />,
          text: "Seating for up to 80 people",
        },
        {
          icon: <ArrowRightIcon className={"text-accent"} size={24} />,
          text: "Wooden flooring ideal for dancing",
        },
      ],
      imageSrc: tempImage,
      price: "£12.00 per hour",
    },
    {
      title: "Main Hall",
      description:
        "A spacious hall perfect for large gatherings, events, and activities.",
      icons: [
        {
          icon: <ArrowRightIcon className={"text-accent"} size={24} />,
          text: "Seating for up to 80 people",
        },
        {
          icon: <ArrowRightIcon className={"text-accent"} size={24} />,
          text: "Wooden flooring ideal for dancing",
        },
      ],
      imageSrc: tempImage,
      price: "£12.00 per hour",
    },
    {
      title: "Main Hall",
      description:
        "A spacious hall perfect for large gatherings, events, and activities.",
      icons: [
        {
          icon: <ArrowRightIcon className={"text-accent"} size={24} />,
          text: "Seating for up to 80 people",
        },
        {
          icon: <ArrowRightIcon className={"text-accent"} size={24} />,
          text: "Wooden flooring ideal for dancing",
        },
      ],
      imageSrc: tempImage,
      price: "£12.00 per hour",
    },
  ];

  return (
    <section className="md:my-32 my-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {facilities.map((facility, i) => (
          <FacilityCard key={i} {...facility} />
        ))}
      </div>
    </section>
  );
};

const FacilityCard = ({ title, description, icons, imageSrc, price }) => {
  //  min-h-[680px]

  return (
    <div className="bg-primary-200 text-text shadow-md overflow-hidden flex flex-col gap-2">
      <img src={imageSrc} alt={title} className="w-full object-cover" />
      <article className="p-4 text-background h-full flex flex-col justify-between gap-4">
        <header>
          <h3 className="text-xl font-mulish font-bold mb-2">{title}</h3>
          <p>{description}</p>
        </header>

        <ul className="flex items-start justify-start flex-col gap-2">
          {icons.map((iconInfo, i) => (
            <li key={i} className="flex flex-row gap-2">
              {iconInfo.icon}
              {iconInfo.text}
            </li>
          ))}
        </ul>

        <div className="flex flex-row justify-between items-center mt-8">
          {price && (
            <div className="mt-4 text-lg">
              <span className="text-accent">{price}</span>
            </div>
          )}

          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
            type="button"
            className="call-to-action-button"
          >
            <span className="text-lg">Book Now</span>
            <ArrowRightIcon size={36} className={""} />
          </motion.button>
        </div>
      </article>
    </div>
  );
};
