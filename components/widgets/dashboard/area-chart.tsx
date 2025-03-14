"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AppointmentsData } from "@/lib/types";

const chartConfig = {
  booked: {
    label: "Booked",
    color: "hsl(var(--chart-2))",
  },
  transferred: {
    label: "Transferred",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AppointmentsAreaChart({ data }: { data: AppointmentsData[] }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillBooked" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={chartConfig.booked.color}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={chartConfig.booked.color}
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillTransferred" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={chartConfig.transferred.color}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={chartConfig.transferred.color}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="transferred"
          type="natural"
          fill="url(#fillTransferred)"
          stroke={chartConfig.transferred.color}
          stackId="a"
          name="Transferred"
        />
        <Area
          dataKey="booked"
          type="natural"
          fill="url(#fillBooked)"
          stroke={chartConfig.booked.color}
          stackId="a"
          name="Booked"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
