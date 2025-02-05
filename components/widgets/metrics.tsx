import React from "react";
import { FaRegClock, FaSackDollar, FaStar } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Metrics() {
  // Sample Data
  const data = {
    moneySaved: 1000,
    timeSaved: 10,
    newCallers: 5,
  };

  const cardContentStyles = "flex flex-row justify-center text-lg md:text-xl";
  const iconStyles = "h-5 w-5 text-gray-400 sm:h-6 sm:w-6";
  const cardHeadingStyles = "justify-center text-xl lg:text-2xl ";

  return (
    <div
      id="metrics"
      className="flex w-full flex-col justify-between gap-5 sm:flex-row"
    >
      <Card id="money-saved" className="flex-1 justify-center">
        <CardHeader className="items-center">
          <CardTitle>
            <div className="flex flex-row items-center justify-center gap-2">
              <FaSackDollar className={iconStyles} />
              <p className={cardHeadingStyles}>Money Saved</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cardContentStyles}>
            <p className="font-bold text-green-600">$</p>
            <span>{data.moneySaved}</span>
          </div>
        </CardContent>
      </Card>
      <Card id="time-saved" className="flex-1 justify-center">
        <CardHeader className="items-center">
          <CardTitle>
            <div className="flex flex-row items-center justify-center gap-2">
              <FaRegClock className={iconStyles} />
              <p className={cardHeadingStyles}>Time Saved</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cardContentStyles}>
            <p className="font-bold text-green-600">+</p>
            <div className="flex flex-row gap-1">
              <span>{data.timeSaved}</span>
              <p> hrs</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card id="new-callers" className="flex-1">
        <CardHeader className="items-center">
          <CardTitle>
            <div className="flex flex-row items-center justify-center gap-2">
              <FaStar className={iconStyles} />
              <p className={cardHeadingStyles}>New Callers</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cardContentStyles}>
            <p>{data.newCallers}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
