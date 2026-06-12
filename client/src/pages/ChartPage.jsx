import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../layouts/DashboardLayout";
import TradingChart from "../components/TradingChart";
import RSIChart from "../components/RSIChart";
import MACDChart from "../components/MACDChart";
import socket from "../socket/socket";
import { fetchFullChartData } from "../services/fullChartServices";

function ChartPage() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [searchSymbol, setSearchSymbol] = useState("BTCUSDT");
    const [interval, setIntervalValue] = useState("1h");
    const [liveChartData, setLiveChartData] = useState([]);

    const [showEMA, setShowEMA] = useState(true);
    const [showSMA, setShowSMA] = useState(true);
    const [showBollinger, setShowBollinger] = useState(true);
    const [showRSI, setShowRSI] = useState(true);
    const [showMACD, setShowMACD] = useState(true);


    // ⚠️ Socket (can be disabled if needed)
    useEffect(() => {
        const handleCandleUpdate = (candles) => {
            setLiveChartData(candles);
        };

        socket.on("candle-update", handleCandleUpdate);

        return () => {
            socket.off("candle-update", handleCandleUpdate);
        };
    }, []);

    // ✅ Single API call
    const { data: fullChart, isLoading } = useQuery({
        queryKey: ["fullChart", symbol, interval],
        queryFn: () => fetchFullChartData(symbol, interval),
    });

    // ✅ Chart data (live overrides API if available)
    const chartData =
        liveChartData.length > 0
            ? liveChartData
            : fullChart?.candles;

    const movingAverages = fullChart?.movingAverages;
    const indicators = fullChart?.indicators;

    if (isLoading) {
        return <div>Loading Chart...</div>;
    }

    return (
        <DashboardLayout>
            <h1 className="text-3xl mb-5">{symbol} Chart</h1>

            {/* SYMBOL SEARCH */}
            <div className="mb-5 flex gap-3">
                <input
                    type="text"
                    placeholder="BTCUSDT"
                    value={searchSymbol}
                    onChange={(e) =>
                        setSearchSymbol(e.target.value.toUpperCase())
                    }
                    className="border p-2 rounded"
                />

                <button onClick={() => setSymbol(searchSymbol)}>
                    Search
                </button>
            </div>

            {/* INTERVALS */}
            <div className="mb-5">
                <button onClick={() => setIntervalValue("1m")}>1m</button>
                <button onClick={() => setIntervalValue("5m")}>5m</button>
                <button onClick={() => setIntervalValue("15m")}>15m</button>
                <button onClick={() => setIntervalValue("1h")}>1h</button>
                <button onClick={() => setIntervalValue("4h")}>4h</button>
                <button onClick={() => setIntervalValue("1d")}>1d</button>
            </div>

            {/* INDICATORS TOGGLES */}
            <div className="mb-5 flex gap-3">
                <button onClick={() => setShowEMA(!showEMA)}>
                    EMA20
                </button>

                <button onClick={() => setShowSMA(!showSMA)}>
                    SMA20
                </button>

                <button onClick={() => setShowBollinger(!showBollinger)}>
                    Bollinger
                </button>

                <button onClick={() => setShowRSI(!showRSI)}>
                    RSI
                </button>

                <button onClick={() => setShowMACD(!showMACD)}>
                    MACD
                </button>
            </div>

            {/* MAIN CHART */}
            <TradingChart
                data={chartData}
                indicators={movingAverages}
                showEMA={showEMA}
                showSMA={showSMA}
                showBollinger={showBollinger}
            />

            {/* RSI */}
            {showRSI && indicators?.RSI && (
                <RSIChart rsiData={indicators.RSI} />
            )}

            {/* MACD */}
            {showMACD && indicators?.MACD && (
                <MACDChart macdData={indicators.MACD} />
            )}
        </DashboardLayout>
    );
}

export default ChartPage;