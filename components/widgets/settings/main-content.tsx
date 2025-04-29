"use client";

import { debounce } from "lodash"; // debouce to prevent too many animations
import { useEffect, useRef,useState } from "react";

import {
  settingSection,
} from "@/lib/constant";
import { settingMenu } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

import { Invoices } from "./invoices";
import { Password } from "./password-section";
import { PaymentInfo } from "./payment-info";
import { Plan } from "./plan/plan";
import { Profile } from "./profile/profile";

export function MainContent({ changeView }: { changeView: (view: string) => void }) {
  const [currSection, setCurrSection] = useState<string>("Profile");
  const sectionIds = settingMenu.map((item) => item.url);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationLock = useRef(false); //prevent overlapping animations

  useEffect(() => {
    const handleIntersection = debounce((entries: IntersectionObserverEntry[]) => {
      if (animationLock.current) return;

      // find most visible section
      const mostVisibleEntry = entries.reduce((max, entry) => 
        entry.isIntersecting && entry.intersectionRatio > (max?.intersectionRatio || 0) 
          ? entry 
          : max
      , null as IntersectionObserverEntry | null);

      if (!mostVisibleEntry) return;

      const targetId = mostVisibleEntry.target.id;
      const targetIndex = sectionIds.indexOf(targetId);
      const currentIndex = sectionIds.indexOf(currSection);

      if (targetIndex === -1 || targetId === currSection) return;

      animationLock.current = true;
      changeView(targetId);

      const targetCard = mostVisibleEntry.target.firstChild as HTMLElement;
      const prevSection = document.getElementById(currSection);
      const prevCard = prevSection?.firstChild as HTMLElement;

      
      const isScrollingDown = currentIndex !== -1 && targetIndex > currentIndex; //determine scroll direction

      const applyAnimations = () => {
        if (isScrollingDown) {
          // Downscroll animation
          if (targetCard) {
            targetCard.classList.remove("translate-y-full", "opacity-0");
            targetCard.classList.add("translate-y-1", "opacity-100");
          }
          if (prevCard) {
            prevCard.classList.remove("translate-y-1", "opacity-100");
            prevCard.classList.add("-translate-y-full", "opacity-0");
          }
        } else {
          // Upscroll animation
          if (targetCard) {
            targetCard.classList.remove("-translate-y-full", "opacity-0");
            targetCard.classList.add("translate-y-1", "opacity-100");
          }
          if (prevCard) {
            prevCard.classList.remove("translate-y-1", "opacity-100");
            prevCard.classList.add("translate-y-full", "opacity-0");
          }
        }
      };

      requestAnimationFrame(() => {
        applyAnimations();
        
        // Release lock after animation duration (1000ms matches your CSS)
        setTimeout(() => {
          setCurrSection(targetId);
          animationLock.current = false;
        }, 1000);
      });
    }, 100); // 100ms debounce duration

    const options = {
      threshold: [0.5], 
      rootMargin: "20px 0px -20% 0px",
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observerRef.current?.observe(section);
        
        // Initialize first section
        if (id === "Profile" && currSection === "Profile") {
          const firstCard = section.firstChild as HTMLElement;
          if (firstCard) {
            firstCard.classList.remove("translate-y-full", "opacity-0");
            firstCard.classList.add("translate-y-1", "opacity-100");
          }
        }
      }
    });

    return () => {
      observerRef.current?.disconnect();
      handleIntersection.cancel();
    };
  }, [sectionIds, changeView, currSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

  };

  return (
    <div className={cn(
      "no-scrollbar flex h-full w-full snap-y snap-mandatory scroll-py-6 flex-col space-y-10 overflow-y-auto overflow-x-hidden p-4",
    )}>
      <section className={cn(settingSection)} id="Profile">
        <Profile />
      </section>
      <section className={cn(settingSection)} id="Password">
        <Password />
      </section>
      <section className={cn(settingSection)} id="Card-Information">
        <PaymentInfo />
      </section>
      <section className={cn(settingSection)} id="Plans">
        <Plan onClickUpdate={() => scrollToSection("Card-Information")} />
      </section>
      <section className={cn(settingSection)} id="Invoices">
        <Invoices plan="monthly" />
      </section>
    </div>
  );
}