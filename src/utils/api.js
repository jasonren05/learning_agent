import axios from 'axios'

// 配置axios基础URL
axios.defaults.baseURL = '/api'

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
  register: (userData) => axios.post('/register', userData),
  login: (credentials) => axios.post('/login', credentials),
  
  // 文件上传
  uploadFile: (formData) => 
    axios.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  // 笔记相关
  getNotes: () => axios.get('/notes'),
  getNote: (id) => axios.get(`/notes/${id}`),
  
  // AI功能
  enhanceNotes: (content, isImage = false) => 
    axios.post('/enhance-notes', { content, is_image: isImage }),
  
  analyzeProblems: (problems, isImage = false) => 
    axios.post('/analyze-problems', { problems, is_image: isImage }),
  
  generateEnglishStudy: (text, isImage = false) => 
    axios.post('/english-study', { text, is_image: isImage }),
  
  recordVocabulary: (word, known) => 
    axios.post('/vocabulary', { word, known }),
  
  // 学习进度
  getProgress: () => axios.get('/progress')
}

export default api
