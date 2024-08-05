import { lazy } from 'react';

const lazyLoader = (importFunc: () => Promise<any>) => {
  const LazyComponent = lazy(importFunc);

  return {
    Component: LazyComponent,
    preload: () => importFunc(),
  };
};

export default lazyLoader;