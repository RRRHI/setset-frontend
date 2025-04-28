"use client";

import { useEffect , useState} from "react";

import { opacityAnimation, settingCard, settingSection, upwardScrollAnimation } from "@/lib/constant";
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

  const [currSection, setCurrSection] = useState<string>("Proifle");
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
          changeView(entry.target.id);
          //this is working
          visibleSections.set(entry.target.id, entry.intersectionRatio);

          console.log("Visible section:", sectionIds.indexOf(entry.target.id));
          if (sectionIds.indexOf(entry.target.id) > sectionIds.indexOf(currSection)) {
           //animate downwards
            const firstChild = entry.target.firstChild as HTMLElement;
            if (firstChild) {
              firstChild.classList.remove("translate-y-full", "opacity-0");
              firstChild.classList.add("translate-y-1", "opacity-100"); 

          } else 
          {
            //animate upwards
            const firstChild = entry.target.firstChild as HTMLElement;
            if (firstChild) {
              firstChild.classList.remove("-translate-y-full", "opacity-0");
              firstChild.classList.add("translate-y-1", "opacity-100"); 
            }
          }

        }

        } else {
          const preViewSection = document.getElementById(currSection) as HTMLElement;
          if(preViewSection){
            preViewSection.classList.remove("translate-y-1", "duration-100");
            preViewSection.classList.add("-translate-y-full", "opacity-0", "ease-out", "-translate-y-full");
          }
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
