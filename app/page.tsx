import Appointments from "@/components/widgets/appointments";
import Faqs from "@/components/widgets/faqs";
import Metrics from "@/components/widgets/metrics";

export default function Home() {
  return (
    <div
      id="main"
      className="to-primary-gray flex min-h-screen flex-col gap-6 bg-gradient-to-b from-black px-4 py-10 lg:px-6"
    >
      <Metrics />
      <Appointments />
      <Faqs />
    </div>
  );
}
