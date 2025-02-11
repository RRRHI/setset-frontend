import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Appointments() {
  // Sample Data
  const data = {
    appointments: [
      {
        id: 1,
        name: "John Doe",
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Booked",
      },
      {
        id: 2,
        name: "Jane Doe",
        date: "2025-01-02",
        time: "11:00 AM",
        status: "Rescheduled",
      },
      {
        id: 3,
        name: "John Smith",
        date: "2025-01-03",
        time: "12:00 PM",
        status: "Cancelled",
      },
      {
        id: 4,
        name: "Jane Smith",
        date: "2025-01-04",
        time: "1:00 PM",
        status: "Transferred",
      },
    ],
    booked: 57267,
    cancelled: 100,
    rescheduled: 200,
    transferred: 2700,
  };

  return (
    <div className="flex w-full flex-col">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold lg:text-2xl">
            Appointments
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
