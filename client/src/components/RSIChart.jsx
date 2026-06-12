import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine,
    Tooltip
} from "recharts";

function RSIChart({ rsiData }) {

    if (!rsiData || rsiData.length === 0) {

        return (
            <div>
                Loading RSI...
            </div>
        );

    }

    if (!Array.isArray(rsiData)) {
        return <div>Loading RSI...</div>;
    }

    const data = rsiData.map((value, index) => ({
        index,
        value
    }));

    return (

        <LineChart
            width={1100}
            height={250}
            data={data}
        >

            <CartesianGrid />

            <XAxis dataKey="index" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <ReferenceLine
                y={70}
                stroke="red"
            />

            <ReferenceLine
                y={30}
                stroke="green"
            />

            <Line
                type="monotone"
                dataKey="value"
                stroke="purple"
                dot={false}
            />

        </LineChart>

    );

}

export default RSIChart;