import React from "react";
import tempImage from "../assets/placeholder.png";
import { ArrowRightIcon, CalendarIcon } from "../assets/icons/Icons";

import { motion } from "motion/react";

const paragraphs = [
  "Welcome to Eastville Midville and New Leake Village Hall, where our charming village meets the breath taking country side. Here our hall is more than just a venue its the vibrant heart of our rural community.",
  "We take pride in our cherished venue. We warmly invite you to join us for a wide range of activities and celebrations, making us the ideal choice for all your event needs.",
];

export const AboutUsSection = () => {
  return (
    <section className="container mx-auto text-text px-2">
      <header>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.1 }}
          className="text-2xl text-primary-200 font-mulish uppercase text-center mt-16 mb-4"
        >
          Eastville Midville and New Leake Village Hall
        </motion.h2>

        <div className="flex items-stretch justify-center flex-col md:flex-row gap-4">
          {paragraphs.map((text, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 * i }}
                viewport={{ once: false, amount: 0.1 }}
                className="flex-1 basis-0"
              >
                <p className="text-lg text-start">{text}</p>
              </motion.div>
              {i < paragraphs.length - 1 && (
                <span className="md:w-px w-[80%] mx-auto h-0.5 md:h-auto md:self-stretch bg-primary-200 md:mx-16" />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      <AboutUsCTA />
    </section>
  );
};

const AboutUsCTA = () => {
  const features = [
    "A spacious main hall (13m × 5m) with seating for up to 80 people",
    "Fully equipped kitchen with oven, fridge, and serving hatch",
    "Tables and chairs available for use",
    "Free Wi-Fi and ample parking",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-col-reverse md:flex-row gap-4 items-center mt-32"
    >
      <motion.article
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="basis-1/2 flex flex-col gap-4 items-start"
      >
        <h3 className="text-primary-200 font-mulish uppercase text-xl text-center md:text-start w-full">
          Making Every Gathering Special
        </h3>

        <p className="text-text text-base">
          Our versatile hall includes:
          <ul className="list-disc pl-8">
            {features.map((feature, i) => (
              <li className="pl-1" key={i}>
                {feature}
              </li>
            ))}
          </ul>
          <br />
          Whether it's a wedding, community meeting, or children’s party our
          space is ready for you.
        </p>

        <motion.button
          type="button"
          className="call-to-action-button !bg-primary-200 !text-background hover:!bg-primary-100 hover:!text-accent self-center md:self-start"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          View Facilities
          <ArrowRightIcon size={40} className={""} />
        </motion.button>
      </motion.article>

      <div
        className="basis-1/2 grid grid-cols-2 gap-2"
        style={{
          gridTemplateRows: "256px 382px",
        }}
      >
        <motion.img
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 * 1 }}
          src={tempImage}
          alt=""
          className="object-cover w-full h-full"
        />
        <motion.img
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 * 2 }}
          src={tempImage}
          alt=""
          className="object-cover w-full h-full"
        />
        <motion.img
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 * 3 }}
          src={tempImage}
          alt=""
          className="object-cover w-full col-span-2 h-full"
        />
      </div>
    </motion.div>
  );
};
