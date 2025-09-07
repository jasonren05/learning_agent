import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { api } from './api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await api.login({ username, password })
      const { access_token, user_id } = response.data
      
      setToken(access_token)
      localStorage.setItem('token', access_token)
      localStorage.setItem('user_id', user_id)
      setUser({ id: user_id, username })
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || '登录失败' 
      }
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, email, password, englishLevel = 'high_school') => {
    setLoading(true)
    try {
      const response = await api.register({
        username,
        email,
        password,
        english_level: englishLevel
      })
      const { access_token, user_id } = response.data
      
      setToken(access_token)
      localStorage.setItem('token', access_token)
      localStorage.setItem('user_id', user_id)
      setUser({ id: user_id, username, email })
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || '注册失败' 
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    delete axios.defaults.headers.common['Authorization']
  }

  const value = {
    token,
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
