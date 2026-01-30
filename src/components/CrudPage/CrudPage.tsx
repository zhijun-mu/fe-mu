import { CrudContext } from "./context.ts";
import { useCrud } from "./useCrud";

import type { CrudPageProps, RecordType } from "./types";

export function CrudPage<T = any, D extends RecordType = RecordType>(props: CrudPageProps<T, D>) {
  const { children, request, initialParams, autoRequest, defaultPageSize } = props;

  const crudContextValue = useCrud<T, D>({
    request,
    initialParams,
    autoRequest,
    defaultPageSize,
  });

  return <CrudContext.Provider value={crudContextValue}>{children}</CrudContext.Provider>;
}
