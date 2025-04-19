"use client";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import Appointments from "@/components/widgets/dashboard/appointments";
import DataTable from "@/components/widgets/dashboard/call-history";
import Metrics from "@/components/widgets/dashboard/metrics";
import Footer from "@/components/widgets/footer";
import { DateProvider } from "@/context/date-context";
import { useDateRange } from "@/hooks/use-date-range";
import { containerClassname } from "@/lib/constant";

function DashboardContent() {
  const { setDateRange } = useDateRange();

  const handleReset = () => {
    const today = new Date();
    setDateRange({ from: today }); //reset the date range to today
    // TODO: Reset all other filters
  };

  return (
    <div className={containerClassname}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <DatePickerWithRange />
        <Button className="flex w-fit flex-row gap-2" onClick={handleReset}>
          <RefreshCw />
          <p>Reset Filters</p>
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-10">
        <Metrics />
        <Appointments />
        <DataTable />
        <Footer />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <DateProvider>
      {/* Needed to separate the content into another function as everything that needs the date needs to be wrapped with DateProvider*/}
      <DashboardContent />
    </DateProvider>
  );
}
