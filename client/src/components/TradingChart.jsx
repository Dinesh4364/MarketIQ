import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, LineSeries } from "lightweight-charts";

function TradingChart({
  data,
  indicators,
  showEMA,
  showSMA,
  showBollinger
}) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    if (!chartContainerRef.current) return;

    // 🧹 Remove previous chart (important for React StrictMode)
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      width: 1100,
      height: 600,

      layout: {
        background: { color: "#131722" },
        textColor: "#d1d4dc"
      },

      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" }
      },

      crosshair: { mode: 1 },

      rightPriceScale: {
        borderColor: "#485c7b"
      },

      timeScale: {
        borderColor: "#485c7b"
      }
    });

    chartRef.current = chart;

    // Candlestick series
    const candlestickSeries = chart.addSeries(CandlestickSeries);

    // Indicator series
    const emaSeries = chart.addSeries(LineSeries, {
      color: "yellow",
      lineWidth: 2
    });

    const smaSeries = chart.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 2
    });

    const upperBandSeries = chart.addSeries(LineSeries, {
      color: "#00FF00",
      lineWidth: 1
    });

    const middleBandSeries = chart.addSeries(LineSeries, {
      color: "#FFFFFF",
      lineWidth: 1
    });

    const lowerBandSeries = chart.addSeries(LineSeries, {
      color: "#FF0000",
      lineWidth: 1
    });

    // Visibility toggles
    emaSeries.applyOptions({ visible: showEMA });
    smaSeries.applyOptions({ visible: showSMA });

    upperBandSeries.applyOptions({ visible: showBollinger });
    middleBandSeries.applyOptions({ visible: showBollinger });
    lowerBandSeries.applyOptions({ visible: showBollinger });

    candlestickSeries.applyOptions({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350"
    });

    // =========================
    // 🧼 SAFE DATA CLEANING
    // =========================

    const cleanedData = data
      .filter(c => c && c.time != null)
      .map(c => {
        let time = c.time;

        // Convert JS milliseconds → seconds
        if (typeof time === "number" && time > 1e12) {
          time = Math.floor(time / 1000);
        }

        // Convert ISO string → seconds
        if (typeof time === "string") {
          time = Math.floor(new Date(time).getTime() / 1000);
        }

        return {
          ...c,
          time
        };
      })
      .filter(c => c.time && !isNaN(c.time));

    console.log("Cleaned first candle:", cleanedData[0]);

    candlestickSeries.setData(cleanedData);

    // =========================
    // Indicators (safe aligned)
    // =========================
    console.log(indicators);

    if (indicators && cleanedData.length > 20) {
      const offset = 19;

      const emaData = indicators.ema20
        ?.map((value, i) => {
          const base = cleanedData[i + offset];
          if (!base?.time) return null;
          return { time: base.time, value };
        })
        .filter(Boolean);

      const smaData = indicators.sma20
        ?.map((value, i) => {
          const base = cleanedData[i + offset];
          if (!base?.time) return null;
          return { time: base.time, value };
        })
        .filter(Boolean);

      const upperBandData = indicators.bollinger
        ?.map((item, i) => {
          const base = cleanedData[i + offset];
          if (!base?.time) return null;
          return { time: base.time, value: item.upper };
        })
        .filter(Boolean);

      const middleBandData = indicators.bollinger
        ?.map((item, i) => {
          const base = cleanedData[i + offset];
          if (!base?.time) return null;
          return { time: base.time, value: item.middle };
        })
        .filter(Boolean);

      const lowerBandData = indicators.bollinger
        ?.map((item, i) => {
          const base = cleanedData[i + offset];
          if (!base?.time) return null;
          return { time: base.time, value: item.lower };
        })
        .filter(Boolean);

      emaSeries.setData(emaData || []);
      smaSeries.setData(smaData || []);
      upperBandSeries.setData(upperBandData || []);
      middleBandSeries.setData(middleBandData || []);
      lowerBandSeries.setData(lowerBandData || []);
    }

    chart.timeScale().fitContent();

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, indicators, showEMA, showSMA, showBollinger]);

  return (<div ref={chartContainerRef} />);
}

export default TradingChart;