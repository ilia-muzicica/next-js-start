import * as React from 'react';
import {
  Router as BrowserRouter,
  Route as RouteBase,
  RouteProps as RouteBaseProps,
  Switch,
  useLocation,
} from 'react-router-dom';
import { routes, AppRoute } from 'route';
import { history } from 'libs/router';
import { AppLayout, Suspense } from 'ui/templates';
import { useMemo } from 'react';

interface RouteProps extends Pick<AppRoute, Exclude<keyof AppRoute, 'name'>> {
  component: React.FC<RouteBaseProps>;
}

const Route: React.FC<RouteProps> = ({ component: Component, ...route }) => {
  return (
    <RouteBase
      {...route}
      render={(routeProps): React.ReactNode => (
        <React.Suspense fallback={<Suspense />}>
          <Component {...routeProps} />
        </React.Suspense>
      )}
    />
  );
};

export const CreateRouter: React.FC = () => (
  <BrowserRouter history={history}>
    <ModalSwitch />
  </BrowserRouter>
);

const ModalSwitch: React.FC = () => {
  const location = useLocation<any>();

  const [routesWithout, routesWith]: [AppRoute[], AppRoute[]] = useMemo(
    () =>
      routes.reduce<[AppRoute[], AppRoute[]]>(
        ([pass, fail], elem) => {
          return elem.disableLayout ? [[...pass, elem], fail] : [pass, [...fail, elem]];
        },
        [[], []],
      ),
    [],
  );

  const background: any = location.state && location.state.background;

  return (
    <div>
      <Switch>
        {routesWithout.map(({ name, ...route }) =>
          route.children && route.children.length ? (
            route.children.map(subroute => <Route key={subroute.name} {...subroute} />)
          ) : (
            <Route key={name} {...route} />
          ),
        )}
        <AppLayout>
          <Switch location={background || location}>
            {routesWith.map(({ name, ...route }) =>
              route.children && route.children.length ? (
                route.children.map(subroute => <Route key={subroute.name} {...subroute} />)
              ) : (
                <Route key={name} {...route} />
              ),
            )}
          </Switch>
        </AppLayout>
      </Switch>
    </div>
  );
};
