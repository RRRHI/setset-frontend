"use client";

import { useEffect } from "react";

import { settingCard, settingSection } from "@/lib/constant";
import { settingMenu } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

import { Invoices } from "./invoices";
import { Password } from "./password-section";
import { PaymentInfo } from "./payment-info";
import { Plan } from "./plan/plan";
import { Profile } from "./profile/profile";
export function MainContent({
  changeView,
}: {
  changeView: (view: string) => void;
}) {
  // const [viewSection, setViewSection] = useState<string>("");
  const sectionIds = settingMenu.map((item) => item.url);

  useEffect(() => {
    const options = {
      //switching to multiple thresholds
      threshold: [0.2, 0.5, 0.9],

      rootMargin: "20px 0px -20% 0px",
    };

    const visibleSections = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //this is working
          visibleSections.set(entry.target.id, entry.intersectionRatio);
          const firstChild = entry.target.firstChild as HTMLElement;
          if (firstChild) {
            firstChild.classList.remove("translate-y-60", "opacity-0");
            firstChild.classList.add("translate-y-0", "opacity-100");
          }

          const parent = entry.target.parentElement as HTMLElement;
          if (parent) {
            console.log("Parent element:", parent);
          }
            
        
        
          // console.log("Setting a new visible section:", entry.target.firstChild);
        } else {
          const firstChild = entry.target.firstChild as HTMLElement;
          if (firstChild) {
            firstChild.classList.add("translate-y-60", "opacity-0");
            firstChild.classList.remove("translate-y-0", "opacity-100");
          }
          visibleSections.delete(entry.target.id);
          // entry.target.classList.firstChild.remove("bg-blue-300");
          // entry.target.classList.add("opacity-0"); // Fade it out if you want
        }
        

        if (visibleSections.size > 0) {
          const mostVisibleSection = [...visibleSections.entries()].reduce(
            (prev, current) => (current[1] > prev[1] ? current : prev),
          );

          changeView(mostVisibleSection[0]);
          // console.log(
          //   "viewSection",
          //   mostVisibleSection[0],
          //   "ratio:",
          //   mostVisibleSection[1],
          // );
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, changeView]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div
      className={cn(
        "no-scrollbar h-full w-full snap-y snap-mandatory scroll-py-6 overflow-y-auto overflow-x-hidden  p-4 flex space-y-10 flex-col ",
      )}
    >

      <section className= {cn(settingSection)} id="Profile">
        <Profile/>
      </section>
      <section className= {cn(settingSection)} id="Password">
        <Password />
      </section>
      <section className= {cn(settingSection)} id="Card-Information">
        <PaymentInfo />
      </section>
      <section className= {cn(settingSection)} id="Plans">
        <Plan onClickUpdate={() => scrollToSection("Card-Information")}/>
      </section>
      <section className= {cn(settingSection)} id="Calendar">
        <div className={settingCard}> This is the calender section</div>
      </section>
      <section className= {cn(settingSection)} id="Invoices">
        <Invoices plan="monthly" />
      </section>

      {/* <section className="min-h-[10vh] snap-start bg-transparent" /> */}
      </div>
  );
}
