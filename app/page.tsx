import { AppSidebar } from "@/components/widgets/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar" 
import Appointments from "@/components/widgets/appointments";
import DataTable from "@/components/widgets/call-history";
import { Footer } from "@/components/widgets/footer";
import Faqs from "@/components/widgets/faqs";
import Metrics from "@/components/widgets/metrics";

export default function Home() {
  return (
    <SidebarProvider> 
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger/>
            </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-10 pt-0 bg-gradient-to-b from-black to-primary-gray">
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
