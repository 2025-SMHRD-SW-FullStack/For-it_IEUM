import apiClient from "../lib/apiClient";

export const newsItem = async () => {
    const res = await apiClient.get('/news');
    return res.data;
};