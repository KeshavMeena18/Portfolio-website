import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NAV = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills & Selected Work", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    if (open && firstRef.current) firstRef.current.focus();
  }, [open]);

  // --- New helpers (behavior only; no visual changes)
  const getNavHeight = () => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-height")
      .trim();
    // parse number from values like "64px"
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 72; // sensible fallback
  };

  const scrollToWithOffset = (el) => {
    const offset = getNavHeight();
    const top = window.scrollY + el.getBoundingClientRect().top - (offset || 0);
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  const go = (id, href) => {
    setActive(id);
    setOpen(false);

    // If Home, go to absolute top (works even if #home not found)
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      scrollToWithOffset(el);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="flex items-center justify-between h-[var(--nav-height)]">
          {/* Logo */}
          <a href="/">
            <img
              src="/favicon.png"
              alt="Keshav Logo"
              className="h-20 w-auto select-none py-2 mx-0 my-10"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.id, n.href);
                    }}
                    className="nav-link text-sm"
                    data-active={active === n.id}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hire Me Btn */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                setActive("contact");
                const el = document.querySelector("#contact");
                if (el) {
                  scrollToWithOffset(el);
                }
              }}
              className="btn-pill px-4 border border-white/12 text-white/90 hover:border-white/20 transition"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Btn */}
          <div className="md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md border border-white/6 text-white/90 hover:bg-white/6"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {open ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <>
                    <path
                      d="M3 7h18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 12h18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 17h18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.22 }}
        className={`md:hidden ${open ? "block" : "hidden"} w-full`}
      >
        <div className="glass mx-4 rounded-lg p-4">
          <ul className="flex flex-col gap-4">
            {NAV.map((n, idx) => (
              <li key={n.id}>
                <a
                  href={n.href}
                  ref={idx === 0 ? firstRef : null}
                  onClick={(e) => {
                    e.preventDefault();
                    go(n.id, n.href);
                  }}
                  className="block px-3 py-2 rounded-md nav-link"
                  data-active={active === n.id}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact", "#contact");
                }}
                className="inline-block mt-2 px-4 py-2 btn-pill border border-white/10 text-white w-full text-center"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </header>
  );
}
