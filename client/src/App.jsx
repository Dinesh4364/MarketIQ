import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import PortfolioPage from "./pages/PortfolioPage";
import WatchlistPage from "./pages/WatchlistPage";
import AlertsPage from "./pages/AlertsPage";
import ProfilePage from "./pages/ProfilePage";
import ChartPage from "./pages/ChartPage";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<DashboardPage />}
            />

            <Route
                path="/dashboard"
                element={<DashboardPage />}
            />

            <Route
                path="/portfolio"
                element={<PortfolioPage />}
            />

            <Route
                path="/watchlist"
                element={<WatchlistPage />}
            />

            <Route
                path="/alerts"
                element={<AlertsPage />}
            />

            <Route
                path="/profile"
                element={<ProfilePage />}
            />

            <Route
                path="/chart"
                element={<ChartPage />}
            />

        </Routes>

    );

}

export default App;