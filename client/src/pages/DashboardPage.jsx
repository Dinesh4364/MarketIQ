import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../layouts/DashboardLayout";
import OverviewCards from "../components/OverviewCards";
import TopGainers from "../components/TopGainers";
import TopLosers from "../components/TopLosers";
import TrendingAssets from "../components/TrendingAssets";
import MarketTable from "../components/MarketTable";

import socket from "../socket/socket";
import { fetchMarketData } from "../services/marketService";

function DashboardPage() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["market"],
        queryFn: fetchMarketData,
        refetchInterval: 10000,
    });

    const [liveData, setLiveData] = useState([]);

    useEffect(() => {
        const handlePriceUpdate = (prices) => {
            setLiveData(prices);
        };

        socket.on("price-update", handlePriceUpdate);

        socket.on(
            "alert-triggered",
            (data) => {
                window.alert(
                    `${data.symbol}
Current Price: ${data.currentPrice}
Condition:
${data.condition} ${data.targetPrice}`
                );
            }
        );

        return () => {
            socket.off("price-update", handlePriceUpdate);
        };
    }, []);

    const marketData = liveData.length ? liveData : data || [];

    if (isLoading) {
        return (
            <div className="text-center mt-20 text-xl">
                Loading market data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-20 text-red-500 text-xl">
                Error loading market data
            </div>
        );
    }

    return (
        <DashboardLayout>
            {/* Overview Cards */}
            <OverviewCards data={marketData} />

            {/* Top Gainers, Top Losers, Trending Assets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                <TopGainers data={marketData} />
                <TopLosers data={marketData} />
                <TrendingAssets data={marketData} />
            </div>

            {/* Market Table */}
            <div className="mt-8">
                <MarketTable data={marketData} />
            </div>
        </DashboardLayout>
    );
}

export default DashboardPage;