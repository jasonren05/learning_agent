import axios from 'axios'

// 使用显式的 /api 前缀，避免与 baseURL 叠加

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API方法
export const api = {
  // 用户认证
  register: (userData) => axios.post('/api/register', userData),
  login: (credentials) => axios.post('/api/login', credentials),
  
  // 文件上传
  uploadFile: (formData) => 
    axios.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  // 笔记相关
  getNotes: () => axios.get('/api/notes'),
  getNote: (id) => axios.get(`/api/notes/${id}`),
  
  // AI功能
  enhanceNotes: (content, isImage = false) => 
    axios.post('/api/enhance-notes', { content, is_image: isImage }),
  
  analyzeProblems: (problems, isImage = false) => 
    axios.post('/api/analyze-problems', { problems, is_image: isImage }),
  
  generateEnglishStudy: (text, isImage = false) => 
    axios.post('/api/english-study', { text, is_image: isImage }),

  // 英语学习文件直传
  englishStudyUpload: (formData) => 
    axios.post('/api/english-study-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  recordVocabulary: (word, known) => 
    axios.post('/api/vocabulary', { word, known }),
  
  // 学习进度
  getProgress: () => axios.get('/api/progress')
}

// 历史记录与查看
export const historyApi = {
  list: (type) => axios.get('/api/history', { params: { type } }),
  get: (id) => axios.get(`/api/history/${id}`),
  download: (id) => axios.get(`/api/history/${id}/download`, { responseType: 'blob' })
}

export const historyMutations = {
  update: (id, content) => axios.put(`/api/history/${id}`, { content }),
  remove: (id) => axios.delete(`/api/history/${id}`)
}

export default api
