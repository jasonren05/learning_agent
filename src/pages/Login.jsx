import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, message, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../utils/auth'

const { Title } = Typography

function Login() {
  const [form] = Form.useForm()
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    const result = await login(values.username, values.password)
    if (result.success) {
      message.success('登录成功')
      navigate('/')
    } else {
      message.error(result.error)
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} className="login-title">全科学习助手</Title>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
            >
              登录
            </Button>
          </Form.Item>

          <div className="login-footer">
            还没有账号？ <Link to="/register">立即注册</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Login
