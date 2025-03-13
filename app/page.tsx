"use client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import Appointments from "@/components/widgets/dashboard/appointments";
import Metrics from "@/components/widgets/dashboard/metrics";
import Footer from "@/components/widgets/footer";
import { DateProvider } from "@/context/DateContext";
import { useDateRange } from "@/hooks/use-date-range";
import DataTable from "@/components/widgets/dashboard/call-history";

function DashboardContent() {
  const { setDateRange } = useDateRange();

  const handleReset = () => {
    const today = new Date();
    setDateRange({ from: today }); //reset the date range to today
    // TODO: Reset all other filters
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-10 pt-0">
      <div className="flex flex-row gap-4">
        <DatePickerWithRange />
        <Button className="flex flex-row gap-2" onClick={handleReset}>
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
