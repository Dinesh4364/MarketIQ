import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function MACDChart({ macdData }) {

    if (!Array.isArray(macdData)) {
        return <div>Loading MACD...</div>;
    }

    const data = macdData.map((item, index) => ({
        index,
        MACD: item.MACD,
        signal: item.signal,
        histogram: item.histogram
    }));

    return (
        <ComposedChart
            width={1100}
            height={250}
            data={data}
        >
            <CartesianGrid />

            <XAxis dataKey="index" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="histogram" />

            <Line
                type="monotone"
                dataKey="MACD"
                dot={false}
            />

            <Line
                type="monotone"
                dataKey="signal"
                dot={false}
            />
        </ComposedChart>
    );
}

export default MACDChart;