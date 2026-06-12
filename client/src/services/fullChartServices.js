import axios from "axios";

const API_URL =
    "http://localhost:5000/api/full-chart";

export const fetchFullChartData = async (
    symbol = "BTCUSDT",
    interval = "1h"
) => {

    const response = await axios.get(

        `${API_URL}?symbol=${symbol}&interval=${interval}`

    );

    return response.data;

};