import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolio";

export const fetchPortfolio = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

export const buyAsset = async (assetData) => {

    const response = await axios.post(

        `${API_URL}/buy`,

        assetData

    );

    return response.data;

};