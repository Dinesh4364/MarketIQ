import axios from "axios";

const API_URL =
    "http://localhost:5000/api/watchlist";


export const fetchWatchlist =
async () => {

    const response =
        await axios.get(API_URL);
    return response.data;
};

export const addToWatchlist =
async (symbol) => {
    const response =
        await axios.post(
            `${API_URL}/add`,
            {
                symbol
            }
        );
    return response.data;
};

export const removeFromWatchlist =
async (symbol) => {
    const response =
        await axios.delete(
            `${API_URL}/remove`,
            {
                data: {
                    symbol
                }
            }
        );
    return response.data;
};