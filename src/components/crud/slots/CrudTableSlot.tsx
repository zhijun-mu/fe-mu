import type { ReactNode } from "react";

import { useCrud } from "../context.ts";
import { CrudTable } from "../schema";

type SlotProps = {
  children?: ReactNode;
};

export function CrudTableSlot({ children }: SlotProps) {
  const crud = useCrud();

  if (children) {
    return <>{children}</>;
  }

  return <CrudTable crud={crud} />;
}
