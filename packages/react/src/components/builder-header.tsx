import * as React from "react";

import { useBuilder } from "~/components/context/builder-context";
import { Button } from "~/components/ui/button";

export const BuilderHeader = () => {
  const { save } = useBuilder();

  return (
    <div className="grid grid-cols-3 gap-4 items-center p-2 shadow-lg sticky inset-x-0 top-0 bg-sb-background z-30">
      <div className="flex gap-4 items-center">
        <Button variant="ghost" size="sm" onClick={save}>
          Opslaan
        </Button>
      </div>
    </div>
  );
};
