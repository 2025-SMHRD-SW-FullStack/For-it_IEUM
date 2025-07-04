import { create } from 'zustand';

const ChatGPTStore = create((set) => ({
    chatGPTResponse: null,
    setChatGPTResponse: (response) => set({ chatGPTResponse: response }),
    clearChatGPTResponse: () => set({ chatGPTResponse: null })
    
}));

export default ChatGPTStore;