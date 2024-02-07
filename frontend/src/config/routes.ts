import Home from "../pages/Profile"

interface RouteType {
    path: string,
    component: React.FC<any>, 
    name: string,
    protected: boolean
}

const routes: RouteType[] = [
    {
      path: "",
      component: Home,
      name: "Home Screen",
      protected: true
    }
  ];
export default routes