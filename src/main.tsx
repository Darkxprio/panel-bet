import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import routes from "./routes";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import "./index.css";

dayjs.locale('es');

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
