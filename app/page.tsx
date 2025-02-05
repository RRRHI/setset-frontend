import Metrics from "@/components/widgets/metrics";
import Image from "next/image";

export default function Home() {
  return (
    <div id="main" className="flex min-h-screen flex-col gap-4 px-4 py-10">
      <Metrics />
    </div>
  );
}
