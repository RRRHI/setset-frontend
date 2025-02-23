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
    <div className="flex-1">
      <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
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
      <div className="flex flex-col items-center gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          5.2% more appointments booked this month
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          February 2025
        </div>
      </div>
    </div>
  );
}
