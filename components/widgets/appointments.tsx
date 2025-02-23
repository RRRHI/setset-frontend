import React from "react";

import { AppointmentsData } from "@/lib/types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DatePickerWithRange } from "../ui/date-picker";
import { AppointmentsRadarChart } from "./radar-chart";

export default function Appointments() {
  // Sample Data
  const data: AppointmentsData = {
    booked: 57267,
    cancelled: 100,
    rescheduled: 200,
    transferred: 2700,
  };

  return (
    <Card className="flex-1 items-stretch">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 text-xl font-bold md:flex-row md:justify-between md:text-2xl lg:text-3xl">
          Appointments
          <DatePickerWithRange />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col gap-4 lg:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm lg:text-base">BOOKED</p>
              <p className="text-sm font-bold text-secondary lg:text-base">
                {data.booked}
              </p>
            </div>
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm lg:text-base">RESCHEDULED</p>
              <p className="text-sm font-bold text-secondary lg:text-base">
                {data.rescheduled}
              </p>
            </div>
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm lg:text-base">TRANSFERRED</p>
              <p className="text-sm font-bold text-secondary lg:text-base">
                {data.transferred}
              </p>
            </div>
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm lg:text-base">CANCELLED</p>
              <p className="text-sm font-bold text-secondary lg:text-base">
                {data.cancelled}
              </p>
            </div>
          </div>
          <AppointmentsRadarChart />
        </div>
      </CardContent>
    </Card>
  );
}
