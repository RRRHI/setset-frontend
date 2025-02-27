import { DatePickerWithRange } from "@/components/ui/date-picker";
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
import { ModeToggle } from "@/components/widgets/theme-toggle";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <ModeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-10 pt-0">
          <DatePickerWithRange />
          <div className="flex flex-1 flex-col gap-10">
            <Metrics />
            {/* <Appointments />
          <Faqs />
          <DataTable /> */}
            <Footer />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
