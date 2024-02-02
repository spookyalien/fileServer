import { FileShare } from "./components/FileShare";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fileShare',
    element: <FileShare />
  }
];

export default AppRoutes;
