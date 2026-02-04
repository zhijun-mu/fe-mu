import React, { Suspense } from "react";

import Spin from "@/components/spin";

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <Spin size="large" className="h-full" />
        </div>
      }
    >
      <Comp />
    </Suspense>
  );
};

export default lazyLoad;
