import React from "react";
import Business from "@/components/widgets/admin/business-card";

export default function Page() {
  return (
    <>
      <div>
        <div className="mt-0 flex flex-col p-8 pt-0">
          <Business isAdminPage={false}/>
        </div>
      </div>
    </>
  );
}
