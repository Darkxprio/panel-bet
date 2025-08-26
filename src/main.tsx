import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import "./index.css";
import routes from "./routes";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { ConfigProvider } from 'antd';
import esES from 'antd/es/locale/es_ES';
import AntApp from 'antd/es/app';

dayjs.locale('es');

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={esES}>
    <AntApp>
      <RouterProvider router={router} />
    </AntApp>
  </ConfigProvider>
);

