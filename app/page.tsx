import Faqs from "@/components/widgets/faqs";
import Metrics from "@/components/widgets/metrics";

export default function Home() {
  return (
    <div
      id="main"
      className="flex min-h-screen flex-col gap-6 bg-gradient-to-b from-black to-gray-900 px-4 py-10 lg:px-6"
    >
      <Metrics />
      <Faqs />
    </div>
  );
}
