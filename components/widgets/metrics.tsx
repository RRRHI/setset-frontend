import {
  MonitorCheck,
  ThumbsUp,
  TimerReset,
  Users,
  Voicemail,
  WalletMinimal,
} from "lucide-react";

import { MetricsData } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "../ui/card";

export default function Metrics() {
  // Sample Data
  const data: MetricsData = {
    callMinutes: { minutes: 100227, difference: -1.4 },
    moneySaved: { money: 601194, difference: 2.5 },
    timeSaved: { time: 100227, difference: 1.8 },
    newCallers: { callers: 66813, difference: -0.5 },
    appointmentsBooked: { appointments: 57267, difference: 0.7 },
    satisfactionScore: { score: 9.7, difference: 0.3 },
  };

  const iconStyles =
    "lg:h-10 lg:w-10 text-white dark:text-black h-8 w-8 bg-black dark:bg-white rounded-lg p-2";
  const cardContentStyles = "flex flex-col px-4 py-6 justify-center";
  const cardInnerStyles =
    "flex flex-col  justify-center text-lg md:text-lg lg:text-2xl";

  //TODO: Replace with actual values from backend in future
  const cards = [
    {
      id: "money-saved",
      icon: <WalletMinimal className={iconStyles} />,
      title: "Money Saved",
      value: data.moneySaved.money,
      difference: data.moneySaved.difference,
    },
    {
      id: "call-minutes",
      icon: <Voicemail className={iconStyles} />,
      title: "Call Minutes",
      value: data.callMinutes.minutes,
      difference: data.callMinutes.difference,
    },
    {
      id: "minutes-saved",
      icon: <TimerReset className={iconStyles} />,
      title: "Minutes Saved",
      value: data.timeSaved.time,
      difference: data.timeSaved.difference,
    },
    {
      id: "new-callers",
      icon: <Users className={iconStyles} />,
      title: "New Callers",
      value: data.newCallers.callers,
      difference: data.newCallers.difference,
    },
    {
      id: "appointments-booked",
      icon: <MonitorCheck className={iconStyles} />,
      title: "Appointments Booked",
      value: data.appointmentsBooked.appointments,
      difference: data.appointmentsBooked.difference,
    },
    {
      id: "satisfactionScore",
      icon: <ThumbsUp className={iconStyles} />,
      title: "Satisfaction Score",
      value: data.satisfactionScore.score,
      difference: data.satisfactionScore.difference,
    },
  ];

  const formatValue = (value: number, type: string) => {
    if (type === "money-saved") {
      return `$${value.toLocaleString()}`;
    }
    if (type === "satisfaction") {
      // Keep decimal places for satisfaction score
      return `${value.toFixed(1)}/10`;
    }
    return value.toLocaleString(); // Add commas for large numbers
  };

  return (
    <div id="metrics" className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <Card key={card.id} className="flex-1 justify-center">
            <CardContent className={cardContentStyles}>
              <div>{card.icon}</div>
              <div className={cardInnerStyles}>
                <p className="pt-4 text-xs md:text-sm">{card.title}</p>
                <div className="flex flex-row items-center gap-2">
                  <p className="font-bold">
                    {formatValue(card.value, card.id)}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-bold",
                      card.difference >= 0 ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {card.difference >= 0
                      ? `+${card.difference}`
                      : card.difference}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
