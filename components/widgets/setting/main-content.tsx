"use client";

import { useEffect, useState } from "react";

import { settingMenu } from "@/lib/sampleData";
import { Invoices } from "../invoices/invoices";

export function MainContent({
  changeView,
}: {
  changeView: (view: string) => void;
}) {
  const [viewSection, setViewSection] = useState<string>("");
  const sectionIds = settingMenu.map((item) => item.url);
  // console.log("sectionId", sectionIds);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setViewSection(entry.target.id);
            changeView(entry.target.id);
          }
        });
      },
      {
        threshold: 1.0,
      },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
        //  console.log('here is the section', section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, changeView]);

  // console.log("viewSection", viewSection);

  return (
    <div className="flex min-w-full flex-col items-center justify-center">
      <h1 className="p-5">Welcome to the user Setting Page</h1>
      <div className="flex w-full flex-col items-center justify-center">
        {settingMenu.map((item) => (
          <div
            id={item.url}
            key={item.title}
            className={`w-full p-4`}
          >
            {item.url==="Invoices" && (
              <>
                {/* <Invoices plan="yearly" /> */}
                <Invoices plan="monthly" />
              </>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}

