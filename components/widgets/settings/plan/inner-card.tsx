import { CircleCheckBig } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { agentPlan } from "@/lib/types";

import { Button } from "../../../ui/button";
import { Card } from "../../../ui/card";

interface innerCardProps {
  cardFormat?: string;
  innerCardHeaderText: string;
  agentPlan: agentPlan;
  innerCardIconFormat: string;
  innerCardContentFormat: string;
  onClickUpdate?: () => void;
  setUpdate: (val: boolean) => void;
}

const InnerCard = ({
  agentPlan,
  cardFormat = "flex flex-col gap-4 border border-foreground p-4",
  innerCardHeaderText,
  innerCardIconFormat,
  innerCardContentFormat,
  onClickUpdate,
  setUpdate,
}: innerCardProps) => {
  return (
    <Card className={cardFormat}>
      <div>
        <div className="flex flex-col items-center pb-2">
          <p className={innerCardHeaderText}>
            {agentPlan.planTitle.toUpperCase()} AGENT
          </p>
          <div className="flex flex-row items-center gap-1">
            <p>CAD</p>
            <p className="font-bold text-setSetOrange">{agentPlan.planPrice}</p>
            <p>/month</p>
          </div>
        </div>
        <div className={innerCardContentFormat}>
          {agentPlan.planFeatures.map((feature) => (
            <div key={feature.title}>
              <div className="flex flex-row items-baseline gap-2">
                <CircleCheckBig className={innerCardIconFormat} />
                <p className="text-sm md:text-base">{feature.title}</p>
              </div>
              <div className="flex flex-col pl-6">
                {feature.subFeatures.map((subFeature) => (
                  <div key={subFeature}>
                    <p className="text-sm md:text-base"> • {subFeature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          className="w-fit"
          variant={"green"}
          onClick={() => setUpdate(true)}
        >
          Change Plan
        </Button>
      </div>
      <Separator className="h-0.5 bg-background" />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-xs font-bold text-foreground/70">
            Renewal Date
          </div>
          <div className="text-sm md:text-base">May 30, 2025</div>
        </div>
        <Button className="" variant="greenText">
          Cancel Plan
        </Button>
      </div>

      <div className="flex flex-row items-center justify-between pt-1">
        <div className="flex flex-col">
          <div className="text-xs font-bold text-foreground/70">
            Payment Method
          </div>
          <div className="text-sm md:text-base">Visa ***1234</div>
        </div>
        <Button className="" variant="greenText" onClick={onClickUpdate}>
          Update
        </Button>
      </div>
    </Card>
  );
};

export default InnerCard;
