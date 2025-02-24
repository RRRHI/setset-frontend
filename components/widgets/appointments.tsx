import React from "react";

import { AppointmentsData } from "@/lib/types";

import { Card, CardContent } from "../ui/card";
import { DatePickerWithRange } from "../ui/date-picker";
import { AppointmentsAreaChart } from "./area-chart";
import { AppointmentsRadarChart } from "./radar-chart";

export default function Appointments() {
  const data: AppointmentsData = {
    booked: 57267,
    cancelled: 100,
    rescheduled: 200,
    transferred: 2700,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 text-xl font-bold md:flex-row md:justify-between md:text-2xl lg:text-3xl">
        Appointments
        <DatePickerWithRange />
      </div>
      <Card className="flex h-full flex-col">
        <CardContent className="flex-1 p-6">
          <div className="grid h-full grid-cols-1 gap-6">
            <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <p className="text-sm lg:text-base">BOOKED</p>
                  <p className="text-sm font-bold text-secondary lg:text-base">
                    {data.booked}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p className="text-sm lg:text-base">RESCHEDULED</p>
                  <p className="text-sm font-bold text-secondary lg:text-base">
                    {data.rescheduled}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p className="text-sm lg:text-base">TRANSFERRED</p>
                  <p className="text-sm font-bold text-secondary lg:text-base">
                    {data.transferred}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p className="text-sm lg:text-base">CANCELLED</p>
                  <p className="text-sm font-bold text-secondary lg:text-base">
                    {data.cancelled}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <AppointmentsRadarChart />
              </div>
            </div>
            <div className="flex-1 items-center justify-center">
              <AppointmentsAreaChart />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
