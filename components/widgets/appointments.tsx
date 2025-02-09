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
        status: "Pending",
      },
      {
        id: 2,
        name: "Jane Doe",
        date: "2025-01-02",
        time: "11:00 AM",
        status: "Confirmed",
      },
      {
        id: 3,
        name: "John Smith",
        date: "2025-01-03",
        time: "12:00 PM",
        status: "Cancelled",
      },
    ],
    booked: 57267,
    cancelled: 100,
    rescheduled: 200,
    transferred: 2700,
  };

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold lg:text-2xl">
            Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p>BOOKED</p>
              <p className="font-bold text-secondary">{data.booked}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
