"use client";

import { useEffect, useState } from "react";

import { settingMenu } from "@/lib/sampleData";
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
            className={`m-20 h-[400px] w-[90%] bg-primary py-20 text-3xl text-primary ${viewSection === item.url ? "!bg-muted-foreground text-foreground" : ""}`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
