import Image from "next/image";

import { imgDiv, setSetLogo, setSetLogoText } from "@/lib/constant";

export function Brand() {
  return (
    <div className={setSetLogo}>
      <div className={imgDiv}>
        <Image src="/images/logo.png" alt="logo" width={60} height={60} />
        <a href="/dashboard" className={setSetLogoText}>
          Setset
        </a>
      </div>
    </div>
  );
}
