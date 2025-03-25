"use client";

import { useEffect, useState } from "react";

import { settingMenu } from "@/lib/sampleData"
export  function MainContent({changeView}: {changeView: (view: string) => void}) {
  const [viewSection, setViewSection] = useState<string>("");
  let sectionIds = settingMenu.map((item) => item.url);
  // console.log("sectionId", sectionIds);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>{
        entries.forEach((entry) =>{
          if(entry.isIntersecting){
            setViewSection(entry.target.id)
            changeView(entry.target.id);
            
          }
        })
      },
      {
        threshold: 1.00
      }
    );
      sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {observer.observe(section);
      //  console.log('here is the section', section);
       
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  // console.log("viewSection", viewSection);
  
  
      
       
  
  return (
    <div className="flex min-w-full flex-col items-center justify-center">
      <h1>Welcome to the user Setting Page</h1>
      <div className="flex flex-col items-center justify-center w-full">
        {settingMenu.map((item) => (
          <div id = {item.url} key={item.title}  className={`py-20 m-20 w-[90%] h-[400px] bg-foreground text-primary text-3xl ${viewSection === item.url ? "!bg-primary text-foreground" : ""}`}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}