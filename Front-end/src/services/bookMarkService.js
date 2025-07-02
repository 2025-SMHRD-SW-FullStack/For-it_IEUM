import apiClient from "../lib/apiClient";

export const getBookMarks = async (userID, hsCode, productName, tax, country, tariff, price, quantity, calculation, chatGPTAnswer) => {
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