import LoginPage from './pages/LoginPage/Index';
import GamesPage from './pages/GamesPage/Index';
import HistoryPage from './pages/HistoryPage/Index';
import DashboardLayout from './layouts/DashboardLayout';

const routes = [
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "games",
                element: <GamesPage />,
            },
            {
                path: "history",
                element: <HistoryPage />,
            },
        ],
    },
];

export default routes;
