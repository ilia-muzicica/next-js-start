import { lazy } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const lazyLoad = (feature: string, page: string) =>
  /*  process.env.NODE_ENV === 'production'
    ?*/ lazy(() =>
    import(
      /* webpackMode: "lazy" */
      `../features/${feature}/pages/${page}`
    ),
  );
// : lazy(() =>
//     import(
//       /* webpackMode: "eager" */
//       `../features/${feature}/pages/${page}`
//     ),
//   );

export default lazyLoad;
