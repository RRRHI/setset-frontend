import Appointments from "@/components/widgets/appointments";
import DataTable from "@/components/widgets/call-history";
import { Footer } from "@/components/widgets/footer";
import Faqs from "@/components/widgets/faqs";
import Metrics from "@/components/widgets/metrics";
import { AppSidebar } from "@/components/widgets/app-sidebar";

export default function Home() {
  return (
    <div
      id="main"
      className="flex min-h-screen max-w-[100vw] flex-row bg-gradient-to-b from-black to-primary-gray px-4 py-10 lg:px-6"
    >
      <div className="w-64 flex-none hidden lg:block">
        <AppSidebar />
      </div>
      <div className="flex-1 flex flex-col gap-6 ml-4">
        <Metrics />
        <Appointments />
        <Faqs />
        <DataTable />
        <Footer />
      </div>
    </div>
  );
}
