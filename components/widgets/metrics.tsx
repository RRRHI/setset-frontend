import React from "react";
import {
  FaFaceSmile,
  FaPhone,
  FaRegClock,
  FaRegClone,
  FaSackDollar,
  FaUser,
} from "react-icons/fa6";

import { MetricsData } from "@/lib/types";

import { Card, CardContent } from "../ui/card";
import { DatePickerWithRange } from "../ui/date-picker";

export default function Metrics() {
  // Sample Data
  const data: MetricsData = {
    callMinutes: 100227,
    moneySaved: 601194,
    timeSaved: 100227,
    newCallers: 66813,
    appointmentsBooked: 57267,
    satisfaction: 9.7,
  };

  const iconStyles = "lg:h-6 lg:w-6 text-secondary h-4 w-4";
  const cardContentStyles = "flex flex-col items-center justify-center";
  const cardInnerStyles =
    "flex flex-col items-center justify-center text-lg md:text-lg lg:text-2xl font-bold";
  const iconDivStyles = "items-center justify-center pt-6";

  //TODO: Replace with actual values from backend in future
  const cards = [
    {
      id: "call-minutes",
      icon: <FaPhone className={iconStyles} />,
      title: "CALL MINUTES",
      value: data.callMinutes,
    },
    {
      id: "money-saved",
      icon: <FaSackDollar className={iconStyles} />,
      title: "MONEY SAVED",
      value: data.moneySaved,
    },
    {
      id: "time-saved",
      icon: <FaRegClock className={iconStyles} />,
      title: "MINUTES TIME SAVED",
      value: data.timeSaved,
    },
    {
      id: "new-callers",
      icon: <FaUser className={iconStyles} />,
      title: "NEW CALLERS",
      value: data.newCallers,
    },
    {
      id: "appointments-booked",
      icon: <FaRegClone className={iconStyles} />,
      title: "APPOINTMENTS BOOKED",
      value: 57267,
    },
    {
      id: "satisfaction",
      icon: <FaFaceSmile className={iconStyles} />,
      title: "SATISFACTION",
      value: data.satisfaction,
    },
  ];

  const formatValue = (value: number, type: string) => {
    if (type === "money-saved") {
      return `$${value.toLocaleString()}`;
    }
    if (type === "satisfaction") {
      // Keep decimal places for satisfaction score
      return `${value.toFixed(2)}/10`;
    }
    return value.toLocaleString(); // Add commas for large numbers
  };

  return (
    <div id="metrics" className="flex flex-col gap-5">
      <DatePickerWithRange />
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        {cards.map((card) => (
          <Card key={card.id} className="flex-1 justify-center">
            <CardContent className={cardContentStyles}>
              <div className={iconDivStyles}>{card.icon}</div>
              <div className={cardInnerStyles}>
                <p className="pt-2">{formatValue(card.value, card.id)}</p>
                <p className="pt-2 text-center text-xs md:text-sm">
                  {card.title}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
