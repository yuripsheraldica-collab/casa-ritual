"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type ScrollContextValue = {
  scrollRef: React.MutableRefObject<number>;
  limitRef: React.MutableRefObject<number>;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollRefs() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScrollRefs must be used within ScrollProvider");
  }
  return ctx;
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef(0);
  const limitRef = useRef(1);

  useLayoutEffect(() => {
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    lenis.on("scroll", ({ scroll, limit }) => {
      scrollRef.current = scroll;
      limitRef.current = limit;
      ScrollTrigger.update();
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollRef, limitRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
