import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/app-sidebar";
import Appointments from "@/components/widgets/appointments";
import DataTable from "@/components/widgets/call-history";
import Faqs from "@/components/widgets/faqs";
import { Footer } from "@/components/widgets/footer";
import Metrics from "@/components/widgets/metrics";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 bg-black transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-10 bg-gradient-to-b from-black to-primary-gray p-10 pt-0">
          <Metrics />
          <Appointments />
          <Faqs />
          <DataTable />
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
