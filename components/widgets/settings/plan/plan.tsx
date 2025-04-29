import { CircleCheckBig } from "lucide-react";
import React, { useState } from "react";

import { Header, planHeader, settingCard } from "@/lib/constant";
import { agentPlan, planFeature } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Button } from "../../../ui/button";
import { Card, CardHeader } from "../../../ui/card";
import InnerCard from "./inner-card";

interface PlanProps {
  onClickUpdate: () => void;
}
const innerCardFormat =
  "flex flex-col w-full lg:w-[30%] gap-4 border border-foreground p-4 justify-between ";
const innerCardHeaderFormat = "flex flex-col items-center text-center ";

const innerCardFeaturesFormat = "flex flex-row items-baseline gap-2";
const innerCardIconFormat = "shrink-0 size-3";
const innerCardContentFormat = "flex flex-col items-start gap-2 mt-6";

const enterpriseFeatures: planFeature[] = [
  {
    title: "Manage multpile phone numbers",
    subFeatures: [],
  },
  {
    title: "All previous features apply",
    subFeatures: [],
  },
];

const planHandleFeatures = [
  "Booking",
  "Inquiries",
  "Upselling",
  "Emergency Triage",
];

const allDayFeatures: planFeature[] = [
  {
    title: "24/7 round the clock support",
    subFeatures: [],
  },
  {
    title: "Off-peak coverage",
    subFeatures: [],
  },
  {
    title: "All previous features apply",
    subFeatures: [],
  },
];

const afterHourFeatures: planFeature[] = [
  {
    title: "Activate after business hours",
    subFeatures: [],
  },
  {
    title: "Every missed captured until next day",
    subFeatures: [],
  },
  {
    title: "Seamlessly handle:",
    subFeatures: planHandleFeatures,
  },
];

const allDayAgent: agentPlan = {
  planTitle: "24/7",
  planFeatures: allDayFeatures,
  planPrice: 299.0,
};

const afterHourAgent: agentPlan = {
  planTitle: "after - hour",
  planFeatures: afterHourFeatures,
  planPrice: 249.0,
};

const enterpriseAgent: agentPlan = {
  planTitle: "enterprise",
  planFeatures: enterpriseFeatures,
  planPrice: 899.0,
};

const agents: agentPlan[] = [afterHourAgent, allDayAgent, enterpriseAgent];

const currentAgent = afterHourAgent;
export function Plan({ onClickUpdate }: PlanProps) {
  const [isUpdating, setUpdate] = useState(false);

  return (
    <Card className={cn(settingCard)}>
      {isUpdating ? (
        <div className="flex flex-col">
          <CardHeader className={cn(Header)}>Choose your plan</CardHeader>
          <div className="flex w-full flex-col justify-between gap-6 lg:flex-row">
            {agents.map((agent) => (
              <Card key={agent.planTitle} className={innerCardFormat}>
                <div className="flex flex-col">
                  <div className={innerCardHeaderFormat}>
                    <p className={cn(planHeader, "pb-1")}>
                      {agent.planTitle.toUpperCase()} AGENT
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <p>CAD</p>
                      <p className="font-bold text-setSetOrange">
                        {agent.planPrice.toFixed(2)}
                        {agent.planTitle.toUpperCase() === "ENTERPRISE" && "+"}
                      </p>
                      <p>/month</p>
                    </div>
                  </div>
                  <div className={innerCardContentFormat}>
                    {agent.planFeatures.map((feature) => (
                      <div key={feature.title} className="flex flex-col gap-1">
                        <div className={innerCardFeaturesFormat}>
                          <CircleCheckBig className={innerCardIconFormat} />
                          <p className="text-sm md:text-base">
                            {feature.title}
                          </p>
                        </div>
                        {/* Sub-features if any */}
                        {feature.subFeatures.length > 0 && (
                          <div className="ml-5 flex flex-col gap-1">
                            {feature.subFeatures.map((sub, idx) => (
                              <div
                                key={idx}
                                className={innerCardFeaturesFormat}
                              >
                                <CircleCheckBig
                                  className={innerCardIconFormat}
                                />
                                <p className="text-sm md:text-base">{sub}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex flex-col items-center justify-center gap-2">
                  {agent === currentAgent && (
                    <p className="text-xs text-[#2a870b] md:text-sm">
                      Get the first 3 months for free
                    </p>
                  )}
                  <Button className="w-full" variant="green">
                    {agent === currentAgent ? "Upgrade to Annual" : "Upgrade"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <Button
            className="mt-4 w-full self-end md:w-[225px]"
            variant="outline"
            onClick={() => setUpdate(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <CardHeader className={cn(Header)}>Current Plan</CardHeader>
          <InnerCard
            agentPlan={afterHourAgent}
            innerCardHeaderText={cn(planHeader, "pb-1")}
            innerCardIconFormat={innerCardIconFormat}
            innerCardContentFormat={innerCardContentFormat}
            onClickUpdate={onClickUpdate}
            setUpdate={setUpdate}
          />
        </>
      )}
    </Card>
  );
}
