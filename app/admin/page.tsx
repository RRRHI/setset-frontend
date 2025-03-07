import React from "react";
import Business from "@/components/widgets/admin/business-card";
import { ModeToggle } from "@/components/widgets/sidebar/theme-toggle";

export default function Page() {

  return(
    <>
      <div>
        <div className="flex flex-col p-8 pt-0 gap-y-6 mt-6">
          <ModeToggle/>
          <Business />
        </div>
      </div>
    </>
  );
}
