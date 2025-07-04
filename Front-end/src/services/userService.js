import apiClient from "../lib/apiClient";

export const login = async ({userId, password}) => {
    const res = await apiClient.post('/login', { 
        userId, 
        password 
    });
    return res.data;
};

export const join = async (userId, name, password,phoneNumber,email,serviceCheck) => {
    const res = await apiClient.post('/join', { 
        userId,
        name,
        password,
        phoneNumber,
        email,
        serviceCheck: JSON.stringify(serviceCheck)
    });
    return res.data;
};