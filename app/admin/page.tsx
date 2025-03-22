import React from "react";

import Business from "@/components/widgets/admin/business-card";

export default function Page() {
  return (
    <>
      <div>
        <div className="mt-0 flex flex-col p-10">
          <Business isAdminPage={true}/>
        </div>
      </div>
    </>
  );
}
