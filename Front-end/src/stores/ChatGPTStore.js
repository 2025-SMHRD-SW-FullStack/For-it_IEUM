import { create } from 'zustand';

const ChatGPTStore = create((set) => ({
    chatGPTResponse: "",
    setChatGPTResponse: (response) => set({ chatGPTResponse: response }),
    clearChatGPTResponse: () => set({ chatGPTResponse: null })
    
}));

export default ChatGPTStore;