import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, CloseIcon } from "../assets/icons/Icons";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Bookings", link: "/bookings" },
  { name: "Contact", link: "/contact" },
];

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="relative h-screen flex flex-col md:flex-row md:h-auto md:justify-between md:container md:mx-auto text-primary-200 md:mt-8">
      <div className="flex flex-row justify-between items-center z-50 relative px-4 py-2">
        <h2 className="font-mulish font-bold text-2xl text-center">
          EMNL Village Hall
        </h2>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden text-white hover:text-pink-500 transition p-2"
        >
          {open ? <CloseIcon size={32} /> : <MenuIcon size={32} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={close}
        className={[
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <MobileNav links={links} open={open} onClose={close} />
      <DesktopNav links={links} />
    </nav>
  );
};

const MobileNav = ({ links, open, onClose }) => {
  return (
    <div
      id="mobile-menu"
      className={[
        // Full-screen panel
        "fixed inset-0 z-40 md:hidden bg-background text-primary-200",
        // Layout: two rows -> content + footer
        "grid grid-rows-[1fr_auto] px-6 pb-8 pt-20",
        "transition-opacity",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Centered link list */}
      <AnimatePresence>
        {open && (
          <motion.ul
            key="menu"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-start justify-center gap-6"
          >
            {links.map((link, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  to={link.link}
                  onClick={onClose}
                  className="text-xl font-mulish text-primary-200-200 hover:text-primary-100 transition"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="w-full">
        <Link
          to="/bookings"
          className="block w-full bg-primary-200 text-background text-center transition-colors duration-300 uppercase text-2xl py-3 rounded-md hover:bg-primary-100 hover:text-accent"
          onClick={onClose}
        >
          Hire the Hall
        </Link>
      </div>
    </div>
  );
};

const DesktopNav = ({ links }) => {
  return (
    <div
      id="desktop-menu"
      className={"md:flex flex-row items-center gap-8 hidden "}
    >
      <AnimatePresence>
        <motion.ul
          key="menu"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-row items-start justify-center gap-6"
        >
          {links.map((link, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Link
                to={link.link}
                className="text-base font-semibold font-mulish text-primary-200-200 hover:text-primary-100 transition"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="">
          <Link
            to="/bookings"
            className="block bg-primary-200 text-background text-center transition-colors duration-300 uppercase text-base py-2 px-6 rounded-none hover:bg-primary-100 hover:text-accent"
          >
            Hire the Hall
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
