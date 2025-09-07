import React from 'react'
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  FileTextOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { useAuth } from '../utils/auth'

const { Header, Sider, Content } = Layout

function AppLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页'
    },
    {
      key: '/notes',
      icon: <FileTextOutlined />,
      label: '笔记管理'
    },
    {
      key: '/english',
      icon: <BookOutlined />,
      label: '英语学习'
    },
    {
      key: '/problems',
      icon: <QuestionCircleOutlined />,
      label: '题目解析'
    },
    {
      key: '/progress',
      icon: <BarChartOutlined />,
      label: '学习进度'
    }
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <h2>学习助手</h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div />
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
          >
            <Button type="text" style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size="small" icon={<UserOutlined />} />
              <span style={{ marginLeft: 8 }}>
                {user?.username || '用户'}
              </span>
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ 
          margin: '24px',
          padding: '24px',
          background: '#fff',
          borderRadius: '8px'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
