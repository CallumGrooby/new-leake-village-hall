import React from "react";
import { AnimatePresence, motion } from "motion/react";
import HallPicture from "../assets/VillageHall.png";
import { ArrowRightIcon, CalendarIcon } from "../assets/icons/Icons";
export const HeroSection = () => {
  return (
    <AnimatePresence>
      <section className="bg-primary-200 flex flex-col items-center overflow-hidden">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "", delay: 0.1 }}
          className="text-background text-center mt-16 mb-8 flex flex-col gap-4"
        >
          <h1 className="text-3xl font-bold">The Heart of Our Community</h1>
          <p className="text-base">
            From celebrations and meetings to clubs and coffee mornings, our
            village hall brings people together all year round.
          </p>

          <div className="flex flex-row gap-4 justify-center mt-8">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
              type="button"
              className="call-to-action-button"
            >
              <span className="text-lg">See Whats One</span>
              <CalendarIcon size={36} className={""} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
              type="button"
              className="call-to-action-button !bg-inherit border border-background !text-background hover:border-accent hover:!text-accent "
            >
              <span className="font-semibold tracking-wider font-mulish text-lg">
                Hire the Hall
              </span>
              <ArrowRightIcon size={36} className="text-current" />
            </motion.button>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.99, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <img
            src={HallPicture}
            alt="Village Hall"
            className="rounded-2xl shadow-xl object-cover"
          />
        </motion.div>
      </section>
    </AnimatePresence>
  );
};
