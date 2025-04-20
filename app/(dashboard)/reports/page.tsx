"use client";

import { Check, Construction } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { containerClassname,flexBetweenCol } from "@/lib/constant";
import { reportsData } from "@/lib/sample-data";
import { ReportData } from "@/lib/types";
import {cn} from "@/lib/utils";

function ReportsContent({ data }: { data: ReportData[] }) {
  const cardContentStyles = "flex flex-col px-4 py-6 justify-center";

  const pendingReports = data.filter((report) => report.status === "Pending");
  const resolvedReports = data.filter((report) => report.status === "Resolved");

  return (
    <div id="reports" className={containerClassname}>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl border-gray-200">
          <TabsTrigger value="pending">
            <div className="flex items-center gap-2">
              <Construction className="size-4 border-foreground text-yellow-300" />
              Pending
            </div>
          </TabsTrigger>
          <TabsTrigger value="resolved">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-green-400" />
              Resolved
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="mt-6 flex flex-col gap-6">
            {pendingReports.map((report) => (
              <Card key={report.id} className="flex-1 justify-center">
                <CardContent className={cardContentStyles}>
                  <div className={cn(flexBetweenCol,"gap-4 md:flex-row md:items-center")}>
                    <div className="flex w-full flex-col gap-4 md:flex-row">
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-semibold">
                            {report.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {report.category}
                          </p>
                        </div>
                        <p className="text-base text-white/70">
                          {report.description}
                        </p>
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
          <div className="mt-6 flex flex-col gap-6">
            {resolvedReports.map((report) => (
              <Card key={report.id} className="flex-1 justify-center">
                <CardContent className={cardContentStyles}>
                  <div className={cn(flexBetweenCol,"gap-4 md:flex-row md:items-center")}>
                    <div className="flex w-full flex-col gap-4 md:flex-row">
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-semibold">
                            {report.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {report.category}
                          </p>
                        </div>
                        <p className="text-base text-white/70">
                          {report.description}
                        </p>
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

export default function Reports() {
  const data = reportsData;

  return <ReportsContent data={data} />;
}
