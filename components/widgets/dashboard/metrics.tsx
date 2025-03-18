import {
  MonitorCheck,
  ThumbsUp,
  TimerReset,
  Users,
  Voicemail,
  WalletMinimal,
} from "lucide-react";

import { metricsData } from "@/lib/sampleData";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "../../ui/card";

export default function Metrics() {
  const iconStyles =
    "lg:h-10 lg:w-10 text-primary h-8 w-8 bg-secondary rounded-lg p-2";
  const cardContentStyles = "flex flex-col px-4 py-6 justify-center";
  const cardInnerStyles =
    "flex flex-col  justify-center text-lg md:text-lg lg:text-2xl";

  const cards = [
    {
      id: "money-saved",
      icon: <WalletMinimal className={iconStyles} />,
      title: "Money Saved",
      value: metricsData.moneySaved.money,
      difference: metricsData.moneySaved.difference,
    },
    {
      id: "call-minutes",
      icon: <Voicemail className={iconStyles} />,
      title: "Call Minutes",
      value: metricsData.callMinutes.minutes,
      difference: metricsData.callMinutes.difference,
    },
    {
      id: "minutes-saved",
      icon: <TimerReset className={iconStyles} />,
      title: "Minutes Saved",
      value: metricsData.timeSaved.time,
      difference: metricsData.timeSaved.difference,
    },
    {
      id: "new-callers",
      icon: <Users className={iconStyles} />,
      title: "New Callers",
      value: metricsData.newCallers.callers,
      difference: metricsData.newCallers.difference,
    },
    {
      id: "appointments-booked",
      icon: <MonitorCheck className={iconStyles} />,
      title: "Appointments Booked",
      value: metricsData.appointmentsBooked.appointments,
      difference: metricsData.appointmentsBooked.difference,
    },
    {
      id: "satisfactionScore",
      icon: <ThumbsUp className={iconStyles} />,
      title: "Satisfaction Score",
      value: metricsData.satisfactionScore.score,
      difference: metricsData.satisfactionScore.difference,
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
                <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
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
