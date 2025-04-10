"use client";

import { useEffect, useState } from "react";
import { Password } from "./password-section";

import { settingMenu } from "@/lib/sample-data";
import { Invoices } from "@/components/widgets/invoices/invoices";
import { ProfilePage } from "./profile/profile";
export function MainContent({
  changeView,
}: {
  changeView: (view: string) => void;
}) {
  // const [viewSection, setViewSection] = useState<string>("");
  const sectionIds = settingMenu.map((item) => item.url);
  // console.log("sectionId", sectionIds);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // setViewSection(entry.target.id);
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
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-col gap-96">
        <ProfilePage />
        <Password/>
        {settingMenu.map((item) => (
          <div
            id={item.url}
            key={item.title}
            className={`w-full p-4`}
          >
            {item.url !== "Profile" && (
              <p>{item.title}</p>
            )}
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
