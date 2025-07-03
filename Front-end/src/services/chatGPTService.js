import apiClient from "../lib/apiClient";

export const chatGPTItem = async (product_name,hs_code,baseTariff,lowestTariff,lowestCountry,availableCountries) => {
    const prompt = `
        ${product_name},
        ${hs_code},
        ${baseTariff},
        ${lowestTariff},
        ${lowestCountry},
        ${availableCountries}`
        
    const res = await apiClient.post('/api/chat', { 
        prompt
    });
    return res.data;
};