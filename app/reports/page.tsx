import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { reportsData } from "@/lib/sampleData";
import { containerClassname, ReportData } from "@/lib/types";
import { Construction, Check } from "lucide-react";

export default function Reports({
  data = reportsData,
}: {
  data: ReportData[];
}) {
  const cardContentStyles = "flex flex-col px-4 py-6 justify-center";

  const pendingReports = data.filter((report) => report.status === "Pending");
  const resolvedReports = data.filter((report) => report.status === "Resolved");

  return (
    <div id="reports" className={containerClassname}>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl border-gray-200">
          <TabsTrigger value="pending">
            <div className="flex items-center gap-2">
              <Construction className="h-4 w-4 border-foreground text-yellow-300" />
              Pending
            </div>
          </TabsTrigger>
          <TabsTrigger value="resolved">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Resolved
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="mt-6 flex flex-col gap-6">
            {pendingReports.map((report) => (
              <Card key={report.id} className="flex-1 justify-center">
                <CardContent className={cardContentStyles}>
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex w-full flex-col gap-4 md:flex-row">
                      <div className="flex w-full flex-col gap-2">
                        <p className="font-semibold">{report.title}</p>
                        <p className="text-sm">{report.description}</p>
                        <p className="text-xs text-gray-500">
                          Date: {report.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="mt-8 flex flex-col gap-8">
            {resolvedReports.map((report) => (
              <Card key={report.id} className="flex-1 justify-center">
                <CardContent className={cardContentStyles}>
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex w-full flex-col gap-4 md:flex-row">
                      <div className="flex w-full flex-col gap-2">
                        <p className="font-semibold">{report.title}</p>
                        <p className="text-sm">{report.description}</p>
                        <p className="text-xs text-gray-500">
                          Date: {report.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
