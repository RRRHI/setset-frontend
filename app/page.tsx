import { DatePickerWithRange } from "@/components/ui/date-picker";
import Appointments from "@/components/widgets/dashboard/appointments";
import Metrics from "@/components/widgets/dashboard/metrics";
import Footer from "@/components/widgets/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-10 pt-0">
      <DatePickerWithRange />
      <div className="flex flex-1 flex-col gap-10">
        <Metrics />
        <Appointments />
        <Footer />
      </div>
    </div>
  );
}
