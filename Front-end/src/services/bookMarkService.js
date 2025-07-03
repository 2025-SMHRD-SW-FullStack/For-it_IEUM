import apiClient from "../lib/apiClient";

export const saveBookMarks = async (userID, hsCode, productName, tax, country, tariff, price, quantity, calculation, chatGPTAnswer) => {
    const res = await apiClient.post('/bookmark/save',{
        userID,
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

export const getBookMarkList = async (userID) => {
    const res = await apiClient.get(`/bookmark/list/${userID}`);
    return res.data;
}