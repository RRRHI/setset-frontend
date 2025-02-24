"use client";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AppointmentsRadar } from "@/lib/types";

const chartData: AppointmentsRadar[] = [
  //sample data

  { type: "Booked", customers: 305 },
  { type: "Rescheduled", customers: 186 },
  { type: "Transferred", customers: 237 },
  { type: "Cancelled", customers: 273 },
];

const chartConfig = {
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AppointmentsRadarChart() {
  return (
    <div className="flex w-full flex-col">
      <ChartContainer config={chartConfig} className="mx-auto h-[200px] w-full">
        <RadarChart data={chartData}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent color="hsl(var(--secondary))" />}
          />
          <PolarAngleAxis dataKey="type" />
          <PolarGrid />
          <Radar
            dataKey="customers"
            fill="var(--color-customers)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
              fill: "hsl(var(--secondary))",
            }}
          />
        </RadarChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col items-center gap-2 text-xs md:text-sm">
        <div className="flex items-center gap-2 text-center font-medium">
          5.2% more appointments booked this month
          <TrendingUp className="size-4" />
        </div>
        <div className="flex items-center text-muted-foreground">
          February 2025
        </div>
      </div>
    </div>
  );
}
