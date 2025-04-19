import React from "react";

import Business from "@/components/widgets/admin/business-card";
import { containerClassname } from "@/lib/constant";

export default function Page() {
  return (
    <>
      <div>
        <div id="admin" className={containerClassname}>
          <Business isAdminPage={true} />
        </div>
      </div>
    </>
  );
}
