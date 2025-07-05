import apiClient from "../lib/apiClient";

export const saveBookMarks = async (hsCode, productName, tax, country, tariff, price, quantity, calculation, chatGPTAnswer) => {
    const res = await apiClient.post('/bookmark/save',{
        hsCode,
        productName,
        tax,
        country,
        tariff,
        price,
        quantity,
        calculation,
        chatGPTAnswer
    })
    return res.data;};

export const getBookMarkList = async () => {
    const res = await apiClient.get("/bookmark/list");
    return res.data;
}

export const deleteBookMark = async (hsCode) => {
    const res = await apiClient.post(`/bookmark/del`,{
        hsCode
    });
    return res.data;
}