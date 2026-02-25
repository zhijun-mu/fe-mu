import type { ReactNode } from "react";
import { useCrud } from "../CrudProvider";
import { CrudFilters } from "../schema/CrudFilters.tsx";

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
