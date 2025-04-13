"use client";

import { useEffect } from "react";

import { settingMenu } from "@/lib/sample-data";

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
     
      rootMargin: "20px 0px -20% 0px"
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
            (prev, current) => (current[1] > prev[1] ? current : prev)
          );
          
          changeView(mostVisibleSection[0]);
          console.log("viewSection", mostVisibleSection[0], "ratio:", mostVisibleSection[1]);
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
    <div className=" flex flex-col items-start p-4">
      <div className=" w-full flex flex-col gap-10">

        <ProfilePage />
        <Password />
        <Invoices plan="monthly" />

      </div>
    </div>
  );
}
