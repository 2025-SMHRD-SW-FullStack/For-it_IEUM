import apiClient from "../lib/apiClient";

export const searchItem = async (choice, input) => {
    const res = await apiClient.post('/api/search', { 
        choice, 
        input 
    });
    return res.data;
};

export const getRank = async () =>{
    const res = await apiClient.get('/api/rank');
    return res.data;
};

export const getCalculation = async (price, quantity, tax, country, tariff) => {
    const res = await apiClient.post('/api/calculation', { 
        price, 
        quantity, 
        tax, 
        country, 
        tariff 
    });
    return res.data;
};