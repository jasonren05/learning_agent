import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic, List, Typography, Button } from 'antd'
import { 
  FileTextOutlined, 
  EyeOutlined, 
  PlusOutlined 
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { api } from '../utils/api'

const { Title } = Typography

function Dashboard() {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    try {
      const response = await api.getProgress()
      setProgress(response.data)
    } catch (error) {
      console.error('加载进度失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: '上传笔记',
      description: '上传新的学习资料',
      icon: <PlusOutlined />,
      onClick: () => navigate('/notes')
    },
    {
      title: '英语学习',
      description: '开始英语文章学习',
      icon: <FileTextOutlined />,
      onClick: () => navigate('/english')
    },
    {
      title: '题目解析',
      description: '获取题目详细解析',
      icon: <FileTextOutlined />,
      onClick: () => navigate('/problems')
    }
  ]

  return (
    <Layout>
      <div className="dashboard">
        <Title level={2}>学习概览</Title>
        
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="总笔记数"
                value={progress?.total_notes || 0}
                prefix={<FileTextOutlined />}
                loading={loading}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="总访问次数"
                value={progress?.total_access || 0}
                prefix={<EyeOutlined />}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="快速操作" style={{ height: '300px' }}>
              <List
                dataSource={quickActions}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={
                        <Button 
                          type="link" 
                          onClick={item.onClick}
                          style={{ padding: 0, height: 'auto' }}
                        >
                          {item.title}
                        </Button>
                      }
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="最近访问的笔记" style={{ height: '300px' }}>
              <List
                loading={loading}
                dataSource={progress?.recent_notes || []}
                renderItem={note => (
                  <List.Item>
                    <List.Item.Meta
                      title={note.title}
                      description={
                        <div>
                          <div>分类: {note.category}</div>
                          <div>访问次数: {note.access_count}</div>
                          <div>最后访问: {new Date(note.last_accessed).toLocaleString()}</div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Dashboard
