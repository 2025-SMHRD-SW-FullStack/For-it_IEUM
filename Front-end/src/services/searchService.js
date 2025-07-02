import apiClient from "../lib/apiClient";

export const searchItem = async (choice, input) => {
    const res = await apiClient.post('/api/search', { 
        choice, 
        input 
    });
    return res.data;
};