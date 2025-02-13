import React from "react";

import { AppointmentsData } from "@/lib/types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DatePickerWithRange } from "../ui/date-picker";

export default function Appointments() {
  // Sample Data
  const data: AppointmentsData = {
    booked: 57267,
    cancelled: 100,
    rescheduled: 200,
    transferred: 2700,
  };

  return (
    <div className="flex w-full flex-col">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex flex-col gap-4 text-xl font-bold md:flex-row md:justify-between lg:text-2xl">
            Appointments
            <DatePickerWithRange />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm">BOOKED</p>
              <p className="font-bold text-secondary">{data.booked}</p>
            </div>
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm">RESCHEDULED</p>
              <p className="font-bold text-secondary">{data.rescheduled}</p>
            </div>
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm">TRANSFERRED</p>
              <p className="font-bold text-secondary">{data.transferred}</p>
            </div>
            <div className="flex flex-row justify-between border-b pb-2">
              <p className="text-sm">CANCELLED</p>
              <p className="font-bold text-secondary">{data.cancelled}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
