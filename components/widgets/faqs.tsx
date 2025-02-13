import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";

import { FaqData } from "@/lib/types";

export default function Faqs() {
  //Sample data
  const questions: FaqData[] = [
    {
      id: "1",
      question: "Are you open today?",
      frequency: 10,
      dates: ["2021-10-01", "2021-10-02"], // Either show only recent 5-10 dates or need a pagination for just the dates portion
    },
    {
      id: "2",
      question: "Can I book an appointment online?",
      frequency: 5,
      dates: ["2021-10-01", "2021-10-02"],
    },
    {
      id: "3",
      question: "I want to cancel my appointment. What should I do?",
      frequency: 3,
      dates: ["2021-10-01", "2021-10-02"],
    },
  ];

  return (
    <div id="faqs" className="flex w-full flex-col gap-4">
      <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
        Frequently Asked Questions
      </p>
      <Accordion type="single" collapsible className="w-full">
        {questions.map(({ id, question, frequency, dates }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="flex w-full flex-row border-b py-2 hover:bg-primary-gray active:bg-primary-gray">
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-left text-base md:text-lg">{question}</p>
                <FaChevronDown />
              </div>
            </AccordionTrigger>
            <AccordionContent className="w-full p-2">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold text-secondary">
                  Frequency: {frequency}
                </p>
                <p className="font-bold">Dates:</p>
                <ul className="list-inside list-disc">
                  {dates.map((date) => (
                    <li key={date}>{date}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
