import Appointments from "@/components/widgets/appointments";
import DataTable from "@/components/widgets/call-history";
import Faqs from "@/components/widgets/faqs";
import Metrics from "@/components/widgets/metrics";

export default function Home() {
  return (
    <div
      id="main"
      className="flex min-h-screen max-w-[100vw] flex-col gap-6 bg-gradient-to-b from-black to-primary-gray px-4 py-10 lg:px-6"
    >
      <Metrics />
      <Appointments />
      <Faqs />
      <DataTable />
    </div>
  );
}
