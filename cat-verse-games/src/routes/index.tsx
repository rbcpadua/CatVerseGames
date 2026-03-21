import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@pages/Home";
import MenuGameSelection from "@pages/MenuGameSelection";

// Criando a configuração de rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/selection",
    element: <MenuGameSelection />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
