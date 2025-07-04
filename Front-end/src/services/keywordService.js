import apiClient from "../lib/apiClient";

export const keywordItem = async () => {
    const res = await apiClient.post('/keyword');
    return res.data;
};
export const keywordSaveItem = async ({hsCode, productName,checkType}) => {
    const res = await apiClient.post('/keyword/interest',{
        hsCode,
        productName,
        checkType
    })
    return res.data;};

    
    export const keywordDeleteItem = async (id) => {
    const res = await apiClient.post('/keyword/delete',{
        id
    })
    return res.data;};