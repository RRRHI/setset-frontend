"use client";

import { useEffect } from "react";

import { settingSection } from "@/lib/constant";
import { settingMenu } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

import { Invoices } from "./invoices";
import { Password } from "./password-section";
import { ProfilePage } from "./profile/profile";
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
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
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

  return (
    <div
      className={cn(
        "no-scrollbar h-full w-full snap-y snap-mandatory scroll-py-6 overflow-y-auto overflow-x-hidden scroll-smooth p-4 flex space-y-10 flex-col",
      )}
    >

      <section className= {cn(settingSection)} id="Profile">
        <ProfilePage />
      </section>
      <section className= {cn(settingSection)} id="Password">
        <Password />
      </section>
      <section className= {cn(settingSection)} id="Invoices">
        <Invoices plan="monthly" />
      </section>
      {/* <section className="min-h-[10vh] snap-start bg-transparent" /> */}



    </div>
  );
}
