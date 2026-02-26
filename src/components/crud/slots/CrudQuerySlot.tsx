import type { ReactNode } from "react";
import { CrudFilters } from "../schema";
import { useCrud } from "../context.ts";

type SlotProps = {
  children?: ReactNode;
};

export function CrudQuerySlot({ children }: SlotProps) {
  const crud = useCrud();

  if (children) {
    return <>{children}</>;
  }

  return <CrudFilters crud={crud} />;
}
