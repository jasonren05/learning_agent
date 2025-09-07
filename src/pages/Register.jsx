import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, message, Typography, Select } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useAuth } from '../utils/auth'

const { Title } = Typography
const { Option } = Select

function Register() {
  const [form] = Form.useForm()
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const englishLevels = [
    { value: 'primary', label: '小学' },
    { value: 'middle', label: '初中' },
    { value: 'high_school', label: '高中' },
    { value: 'cet4', label: '大学四级' },
    { value: 'cet6', label: '大学六级' },
    { value: 'ielts_toefl', label: '雅思托福' }
  ]

  const onFinish = async (values) => {
    const result = await register(
      values.username, 
      values.email, 
      values.password,
      values.englishLevel
    )
    if (result.success) {
      message.success('注册成功')
      navigate('/')
    } else {
      message.error(result.error)
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} className="login-title">用户注册</Title>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{ englishLevel: 'high_school' }}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="englishLevel"
            label="英语水平"
            rules={[{ required: true, message: '请选择英语水平' }]}
          >
            <Select size="large" placeholder="选择您的英语水平">
              {englishLevels.map(level => (
                <Option key={level.value} value={level.value}>
                  {level.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
            >
              注册
            </Button>
          </Form.Item>

          <div className="login-footer">
            已有账号？ <Link to="/login">立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register
