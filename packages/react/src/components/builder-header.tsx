import * as React from "react";

import { useBuilder } from "~/components/context/builder-context";
import { Button } from "~/components/ui/button";

export const BuilderHeader = () => {
  const { save } = useBuilder();

  return (
    <div className="sb-grid sb-grid-cols-3 sb-gap-4 sb-items-center sb-p-2 sb-shadow-lg sb-sticky sb-inset-x-0 sb-top-0 sb-bg-background sb-z-30">
      <div className="sb-flex sb-gap-4 sb-items-center">
        <Button variant="ghost" size="sm" onClick={save}>
          Opslaan
        </Button>
      </div>
    </div>
  );
};
