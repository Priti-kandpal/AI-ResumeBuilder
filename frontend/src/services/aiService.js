import api from './api';

export const aiService = {
  getSuggestions: async (payload) => {
    const response = await api.post('/ai/suggestions', payload);
    return response.data;
  },
};

export default aiService;
