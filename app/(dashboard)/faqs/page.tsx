import { Card, CardContent } from "@/components/ui/card";
import { cardContentStyles, containerClassname,flexBetweenCol } from "@/lib/constant";
import { faqsData } from "@/lib/sample-data";
import { FaqData } from "@/lib/types";
import { cn } from "@/lib/utils";

// only client components can accept props and not page components
function FaqsContent({ data }: { data: FaqData[] }) {

  return (
    <div id="faqs" className={containerClassname}>
      {data.map((faq) => (
        <Card key={faq.id} className="flex-1 justify-center">
          <CardContent className={cardContentStyles}>
            <div className={cn(flexBetweenCol," gap-4 lg:flex-row lg:items-center")}>
              <div className="flex flex-col gap-4 lg:flex-row">
                <div>{faq.icon}</div>
                <div className="flex flex-col gap-2 lg:max-w-[80vw]">
                  <p className="font-semibold">{faq.question}</p>
                  <p className="text-sm">{faq.answer}</p>
                  <p className="text-xs text-green-500">
                    This question has been asked the most between{" "}
                    {faq.timeRangeStart} - {faq.timeRangeEnd}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Frequency: #{faq.frequency}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// page component that doesn't accept props
export default function Faqs() {
  const data = faqsData; // fetch data

  // pass it to the client component
  return <FaqsContent data={data} />;
}
