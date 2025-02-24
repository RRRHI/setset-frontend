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

//sample data
const chartData = [
  { date: "2024-04-01", booked: 222, transferred: 150 },
  { date: "2024-04-02", booked: 97, transferred: 180 },
  { date: "2024-04-03", booked: 167, transferred: 120 },
  { date: "2024-04-04", booked: 242, transferred: 260 },
  { date: "2024-04-05", booked: 373, transferred: 290 },
  { date: "2024-04-06", booked: 301, transferred: 340 },
  { date: "2024-04-07", booked: 245, transferred: 180 },
  { date: "2024-04-08", booked: 409, transferred: 320 },
  { date: "2024-04-09", booked: 59, transferred: 110 },
  { date: "2024-04-10", booked: 261, transferred: 190 },
  { date: "2024-04-11", booked: 327, transferred: 350 },
  { date: "2024-04-12", booked: 292, transferred: 210 },
  { date: "2024-04-13", booked: 342, transferred: 380 },
  { date: "2024-04-14", booked: 137, transferred: 220 },
  { date: "2024-04-15", booked: 120, transferred: 170 },
  { date: "2024-04-16", booked: 138, transferred: 190 },
  { date: "2024-04-17", booked: 446, transferred: 360 },
  { date: "2024-04-18", booked: 364, transferred: 410 },
  { date: "2024-04-19", booked: 243, transferred: 180 },
  { date: "2024-04-20", booked: 89, transferred: 150 },
  { date: "2024-04-21", booked: 137, transferred: 200 },
  { date: "2024-04-22", booked: 224, transferred: 170 },
  { date: "2024-04-23", booked: 138, transferred: 230 },
  { date: "2024-04-24", booked: 387, transferred: 290 },
  { date: "2024-04-25", booked: 215, transferred: 250 },
  { date: "2024-04-26", booked: 75, transferred: 130 },
  { date: "2024-04-27", booked: 383, transferred: 420 },
  { date: "2024-04-28", booked: 122, transferred: 180 },
  { date: "2024-04-29", booked: 315, transferred: 240 },
  { date: "2024-04-30", booked: 454, transferred: 380 },
  { date: "2024-05-01", booked: 165, transferred: 220 },
  { date: "2024-05-02", booked: 293, transferred: 310 },
  { date: "2024-05-03", booked: 247, transferred: 190 },
  { date: "2024-05-04", booked: 385, transferred: 420 },
  { date: "2024-05-05", booked: 481, transferred: 390 },
  { date: "2024-05-06", booked: 498, transferred: 520 },
  { date: "2024-05-07", booked: 388, transferred: 300 },
  { date: "2024-05-08", booked: 149, transferred: 210 },
  { date: "2024-05-09", booked: 227, transferred: 180 },
  { date: "2024-05-10", booked: 293, transferred: 330 },
  { date: "2024-05-11", booked: 335, transferred: 270 },
  { date: "2024-05-12", booked: 197, transferred: 240 },
  { date: "2024-05-13", booked: 197, transferred: 160 },
  { date: "2024-05-14", booked: 448, transferred: 490 },
  { date: "2024-05-15", booked: 473, transferred: 380 },
  { date: "2024-05-16", booked: 338, transferred: 400 },
  { date: "2024-05-17", booked: 499, transferred: 420 },
  { date: "2024-05-18", booked: 315, transferred: 350 },
  { date: "2024-05-19", booked: 235, transferred: 180 },
  { date: "2024-05-20", booked: 177, transferred: 230 },
  { date: "2024-05-21", booked: 82, transferred: 140 },
  { date: "2024-05-22", booked: 81, transferred: 120 },
  { date: "2024-05-23", booked: 252, transferred: 290 },
  { date: "2024-05-24", booked: 294, transferred: 220 },
  { date: "2024-05-25", booked: 201, transferred: 250 },
  { date: "2024-05-26", booked: 213, transferred: 170 },
  { date: "2024-05-27", booked: 420, transferred: 460 },
  { date: "2024-05-28", booked: 233, transferred: 190 },
  { date: "2024-05-29", booked: 78, transferred: 130 },
  { date: "2024-05-30", booked: 340, transferred: 280 },
  { date: "2024-05-31", booked: 178, transferred: 230 },
  { date: "2024-06-01", booked: 178, transferred: 200 },
  { date: "2024-06-02", booked: 470, transferred: 410 },
  { date: "2024-06-03", booked: 103, transferred: 160 },
  { date: "2024-06-04", booked: 439, transferred: 380 },
  { date: "2024-06-05", booked: 88, transferred: 140 },
  { date: "2024-06-06", booked: 294, transferred: 250 },
  { date: "2024-06-07", booked: 323, transferred: 370 },
  { date: "2024-06-08", booked: 385, transferred: 320 },
  { date: "2024-06-09", booked: 438, transferred: 480 },
  { date: "2024-06-10", booked: 155, transferred: 200 },
  { date: "2024-06-11", booked: 92, transferred: 150 },
  { date: "2024-06-12", booked: 492, transferred: 420 },
  { date: "2024-06-13", booked: 81, transferred: 130 },
  { date: "2024-06-14", booked: 426, transferred: 380 },
  { date: "2024-06-15", booked: 307, transferred: 350 },
  { date: "2024-06-16", booked: 371, transferred: 310 },
  { date: "2024-06-17", booked: 475, transferred: 520 },
  { date: "2024-06-18", booked: 107, transferred: 170 },
  { date: "2024-06-19", booked: 341, transferred: 290 },
  { date: "2024-06-20", booked: 408, transferred: 450 },
  { date: "2024-06-21", booked: 169, transferred: 210 },
  { date: "2024-06-22", booked: 317, transferred: 270 },
  { date: "2024-06-23", booked: 480, transferred: 530 },
  { date: "2024-06-24", booked: 132, transferred: 180 },
  { date: "2024-06-25", booked: 141, transferred: 190 },
  { date: "2024-06-26", booked: 434, transferred: 380 },
  { date: "2024-06-27", booked: 448, transferred: 490 },
  { date: "2024-06-28", booked: 149, transferred: 200 },
  { date: "2024-06-29", booked: 103, transferred: 160 },
  { date: "2024-06-30", booked: 446, transferred: 400 },
];

export function AppointmentsAreaChart({ data = chartData }) {
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
