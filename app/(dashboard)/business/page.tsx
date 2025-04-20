import React from "react";

import Business from "@/components/widgets/admin/business-card";
import { containerClassname } from "@/lib/constant";

export default function Page() {
  return (
    <>
      <div id="business" className={containerClassname}>
        <Business isAdminPage={false} />
      </div>
    </>
  );
}
