"use client";
import React, { useRef, useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { ArrowRight, ArrowLeft } from "lucide-react";

/**
 * Drop-in ProjectsSection.jsx
 * - Keeps ProjectCard untouched
 * - Looping carousel (wraps from last -> first and first -> last)
 * - Robust centering: ResizeObserver + image load fallback
 * - Avoids long wrap animations by jumping instantly when wrapping
 * - Tunable constants (GAP, CARD_MIN, TRANSITION)
 */

export default function ProjectsSection() {
const projects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and TailwindCSS.",
    image: "https://picsum.photos/800/600?random=1",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Clean HTML demo
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Weather App",
    description: "Get real-time weather updates with a sleek UI.",
    image: "https://picsum.photos/800/600?random=2",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", // scenic weather feel
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "E-Commerce Store",
    description: "Full-stack e-commerce platform with cart & payments.",
    image: "https://picsum.photos/800/600?random=3",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // animated commercial vibe
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "AI Image Generator",
    description: "Generate unique images with AI prompts.",
    image: "https://picsum.photos/800/600?random=5",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", // sci-fi creative feel
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Chat App",
    description: "Real-time messaging app with socket.io integration.",
    image: "https://picsum.photos/800/600?random=6",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", // dynamic real-time action
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Blog Platform",
    description: "Multi-user blogging platform with rich text editor.",
    image: "https://picsum.photos/800/600?random=7",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // smooth, relaxed storytelling
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Crypto Tracker",
    description: "Track live cryptocurrency prices and trends.",
    image: "https://picsum.photos/800/600?random=8",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // fast-paced analytics feel
    githubLink: "#",
    liveLink: "#",
  },
];





  // ---- Tunable constants ----
  const GAP = 48; // px gap between slides (bigger = more breathing room)
  const CARD_MIN = 280; // minimum slide width (should match ProjectCard's internal width)
  const TRANSITION = "transform 520ms cubic-bezier(.2,0,.2,1)"; // main easing
  // ---------------------------

  const outerRef = useRef(null); // outer wrapper (overflow-visible, provides padding)
  const containerRef = useRef(null); // viewport (overflow-hidden) - used for width measurement
  const listRef = useRef(null); // the flex list that we translate
  const slideRefs = useRef([]); // slide elements
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [hovering, setHovering] = useState(false);


  useEffect(() => {
  if (hovering) return; // don't auto-scroll while hovering

  const interval = setInterval(() => {
    goNext();
  }, 4000);

  return () => clearInterval(interval);
}, [current, hovering]);


  // keep currentRef in sync to avoid stale closures
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // compute and apply slide widths & margins
  const updateLayout = () => {
    const container = containerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    let visible = 3;
    if (cw < 640) visible = 1;
    else if (cw < 1024) visible = 2;
    else visible = 3;

    let slideW = Math.floor((cw - (visible - 1) * GAP) / visible);
    slideW = Math.max(CARD_MIN, slideW);

    slideRefs.current.forEach((el) => {
      if (!el) return;
      el.style.width = `${slideW}px`;
      // margin left/right = half gap
      el.style.margin = `0 ${GAP / 2}px`;
    });
  };

  // center one slide in the viewport (index)
  // smooth = true => use CSS transition; smooth = false => jump instantly (no transition)
  const centerSlide = (index, smooth = true) => {
    const container = containerRef.current;
    const list = listRef.current;
    const slide = slideRefs.current[index];
    if (!container || !list || !slide) return;

    const containerCenter = Math.round(container.clientWidth / 2);
    const slideCenter = Math.round(slide.offsetLeft + slide.clientWidth / 2);
    const newTranslate = Math.round(containerCenter - slideCenter);

    // store transform state
    setTranslateX(newTranslate);

    if (!smooth) {
      // temporarily disable transition and set transform immediately
      list.style.transition = "none";
      list.style.transform = `translateX(${newTranslate}px)`;
      // re-enable transition on the next frame so future changes animate
      requestAnimationFrame(() => {
        // force a reflow then re-enable transition
        list.style.transition = TRANSITION;
      });
    } else {
      // normal behavior: let the effect which listens to translateX apply the transform
    }
  };

  // apply translateX -> transform
  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [translateX]);

  // handle Next/Prev with wrapping logic
  const goNext = () => {
    const len = projects.length;
    const next = (current + 1) % len;
    // if wrapping from last -> first, do immediate jump (no long animation)
    const wrapped = current === len - 1 && next === 0;
    setCurrent(next);
    centerSlide(next, !wrapped);
  };

  const goPrev = () => {
    const len = projects.length;
    const prev = (current - 1 + len) % len;
    const wrapped = current === 0 && prev === len - 1;
    setCurrent(prev);
    centerSlide(prev, !wrapped);
  };

  // clicking a dot
  const goToIndex = (index) => {
    const len = projects.length;
    const wrappedForward = current === len - 1 && index === 0;
    const wrappedBackward = current === 0 && index === len - 1;
    const smooth = !(wrappedForward || wrappedBackward);
    setCurrent(index);
    centerSlide(index, smooth);
  };

  // robust initial layout + ResizeObserver + image load handling
  useEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    // Ensure the list has the right transition style
    list.style.transition = TRANSITION;

    // helper: schedule a cautious center after layout/paint
    const scheduleCenter = (smooth = false) => {
      updateLayout();
      // double RAF to ensure layout & paint finished
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          centerSlide(currentRef.current, smooth);
        });
      });
    };

    // Debounced handler for resize/ResizeObserver
    let resizeTimer = null;
    const debouncedHandler = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateLayout();
        centerSlide(currentRef.current, false);
      }, 100); // tweak debounce if needed
    };

    // Use ResizeObserver where available to detect any size changes (slides, list, container)
    let ro;
    try {
      ro = new ResizeObserver(debouncedHandler);
      ro.observe(container);
      ro.observe(list);
      slideRefs.current.forEach((el) => {
        if (el) ro.observe(el);
      });
    } catch (e) {
      // fallback to window resize
      window.addEventListener("resize", debouncedHandler);
    }

    // Listen for images loading inside the list and re-center once visible ones load
    const imgs = list.querySelectorAll("img");
    let imgsLeft = 0;
    const onImgLoad = () => {
      imgsLeft -= 1;
      if (imgsLeft <= 0) {
        // images finished — schedule an immediate center without animation
        scheduleCenter(false);
      }
    };
    imgs.forEach((img) => {
      if (!img.complete) {
        imgsLeft += 1;
        img.addEventListener("load", onImgLoad, { once: true });
        img.addEventListener("error", onImgLoad, { once: true });
      }
    });

    // best-effort immediate layout + center
    scheduleCenter(false);

    // also ensure we recenter after window load for late assets
    const onLoad = () => scheduleCenter(false);
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      if (ro && ro.disconnect) ro.disconnect();
      window.removeEventListener("resize", debouncedHandler);
      window.removeEventListener("load", onLoad);
      if (resizeTimer) clearTimeout(resizeTimer);
      imgs.forEach((img) => {
        img.removeEventListener("load", onImgLoad);
        img.removeEventListener("error", onImgLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep layout updated on window resize (makes sure slide widths re-calc)
  useEffect(() => {
    const onResize = () => {
      updateLayout();
      // re-center current after layout change
      centerSlide(currentRef.current, false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ensure currentRef updated (already done above, but keep for clarity)
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  return (
    <section
      id="projects"
      className="relative min-h-screen text-white bg-gradient-to-b from-[#090909] to-[#000000] py-12"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        <span className="text-white">My </span>
        <span className="text-emerald-500">Projects</span>
      </h2>

      {/* Outer wrapper: allows cards to "pop" without clipping (overflow-visible) and adds vertical breathing room */}
      <div ref={outerRef} 
        className="w-full max-w-6xl mx-auto px-6 overflow-visible py-8"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      
      >
        {/* Viewport: hides horizontal overflow while we transform the inner list */}
        <div ref={containerRef} className="overflow-hidden">
          {/* The list we translate */}
          <div
            ref={listRef}
            className="flex items-center will-change-transform"
            // transition is set in JS (TRANSITION) but keep this as graceful fallback
            style={{ transition: TRANSITION }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => (slideRefs.current[index] = el)}
                className="flex-shrink-0"
                // width & margins are set in updateLayout() to match container
              >
                <div
                  className={`transition-transform duration-300 ease-out ${current === index ? "scale-100 z-20" : "scale-90 opacity-60 z-0"}`}
                  style={{ transformOrigin: "center bottom" }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    video={project.video}
                    githubLink={project.githubLink}
                    liveLink={project.liveLink}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls area */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="w-10 h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition disabled:opacity-40"
        >
          <ArrowLeft className="text-neutral-700 dark:text-neutral-200" />
        </button>

        <div className="flex gap-3">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`w-3.5 h-3.5 rounded-full transition-transform duration-200 focus:outline-none ${current === idx ? "bg-emerald-400 scale-125 shadow-lg shadow-emerald-500/30" : "bg-gray-600"}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label="Next"
          className="w-10 h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition disabled:opacity-40"
        >
          <ArrowRight className="text-neutral-700 dark:text-neutral-200" />
        </button>
      </div>
    </section>
  );
}
