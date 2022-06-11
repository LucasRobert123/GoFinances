import { BottomTabNavigatorRoutes } from "../../routes/app.routes";

type Routes = BottomTabNavigatorRoutes;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends Routes {}
  }
}
