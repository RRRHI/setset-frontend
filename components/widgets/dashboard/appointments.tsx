import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/lib/constant";
import { chartData } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

import { AppointmentsAreaChart } from "./area-chart";

export default function Appointments() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="flex h-full flex-col">
        <CardContent className="flex-1 p-6">
          <div className={cn(Header)}>Appointments</div>
          <div className="flex h-full flex-col">
            <div className="flex-1 items-center justify-center">
              <AppointmentsAreaChart data={chartData} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
