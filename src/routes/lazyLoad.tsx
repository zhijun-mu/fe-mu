import React, { Suspense } from "react";

import Spin from "@/components/Spin";

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense fallback={<Spin size="large" className="h-full" />}>
      <Comp />
    </Suspense>
  );
};

export default lazyLoad;
