import { CrudPage } from "@/components/crud";

import { page } from "@/api/sys/user";

export default function ExamplePage() {
  return (
    <>
      <h1>example</h1>
      <CrudPage api={{ page: page }}></CrudPage>
    </>
  );
}
