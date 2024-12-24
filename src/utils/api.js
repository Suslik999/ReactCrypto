import axios from 'axios';

const API_KEY = 'CG-S6y5ERq4nqsLbd1U7MCwaQ8x';
const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoData = async (currency) => {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false,
        },
    });
    return response.data;
};

export const fetchCryptoDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/coins/${id}`);
    return response.data;
};
