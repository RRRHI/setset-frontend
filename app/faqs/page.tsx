import { Card, CardContent } from "@/components/ui/card";
import { faqsData } from "@/lib/sampleData";
import { containerClassname, FaqData } from "@/lib/types";

export default function Faqs({ data = faqsData }: { data: FaqData[] }) {
  const cardContentStyles = "flex flex-col px-4 py-6 justify-center";

  return (
    <div id="faqs" className={containerClassname}>
      {data.map((faq) => (
        <Card key={faq.id} className="flex-1 justify-center">
          <CardContent className={cardContentStyles}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
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
