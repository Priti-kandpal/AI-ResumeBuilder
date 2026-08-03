import api from './api';

export const resumeService = {
  getResumes: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },

  getResumeById: async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },

  createResume: async (resumeData) => {
    const response = await api.post('/resumes', resumeData);
    return response.data;
  },

  updateResume: async (id, resumeData) => {
    const response = await api.put(`/resumes/${id}`, resumeData);
    return response.data;
  },

  deleteResume: async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
  },
};

export default resumeService;
