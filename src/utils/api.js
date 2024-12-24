import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/';
let lastRequestTime = 0;

const rateLimitedRequest = async (url, params) => {
    const now = Date.now();
    const delay = Math.max(0, 1200 - (now - lastRequestTime));
    await new Promise((resolve) => setTimeout(resolve, delay));
    lastRequestTime = Date.now();

    return axios.get(url, { params });
};

export const fetchCryptoData = async (currency = 'usd') => {
    try {
        const response = await rateLimitedRequest(`${API_URL}coins/markets`, {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false,
        });

        if (response.status !== 200 || !Array.isArray(response.data)) {
            throw new Error('Invalid response format');
        }

        return response.data;
    } catch (error) {
        if (error.response?.status === 429) {
            console.error('Rate limit exceeded. Please try again later.');
        } else {
            console.error('Error fetching crypto data:', error.message || error);
        }
        return [];
    }
};

export const fetchCryptoDetails = async (id) => {
    try {
        const response = await rateLimitedRequest(`${API_URL}coins/${id}`);

        if (response.status !== 200 || typeof response.data !== 'object') {
            throw new Error('Invalid response format');
        }

        return response.data;
    } catch (error) {
        if (error.response?.status === 429) {
            console.error('Rate limit exceeded. Please try again later.');
        } else {
            console.error('Error fetching crypto details:', error.message || error);
        }
        return {};
    }
};
