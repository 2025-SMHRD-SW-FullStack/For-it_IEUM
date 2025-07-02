import apiClient from "../lib/apiClient";

export const chatGPTItem = async (itemName,hsCode,baseTariff,lowestTariff,lowestCountry,availableCountries) => {
    const prompt = `${itemName},${itemName},${hsCode},${baseTariff},${lowestTariff},${lowestCountry},${availableCountries}`
    const res = await apiClient.post('/api/chat', { 
        prompt
    });
    return res.data;
};