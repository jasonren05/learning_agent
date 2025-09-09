import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic, Typography, Spin } from 'antd'
import { 
  FileTextOutlined, 
  EyeOutlined
} from '@ant-design/icons'
import Layout from '../components/Layout'
import { api } from '../utils/api'

const { Title } = Typography

function Progress() {
  const [progressData, setProgressData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    try {
      const response = await api.getProgress()
      setProgressData(response.data)
    } catch (error) {
      console.error('加载进度失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>加载学习进度中...</div>
        </div>
      </Layout>
    )
  }

  // 已移除掌握度相关逻辑

  return (
    <Layout>
      <div className="progress-page">
        <Title level={2}>学习进度报告</Title>
        
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={12}>
            <Card>
              <Statistic
                title="总笔记数量"
                value={progressData?.total_notes || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <Card>
              <Statistic
                title="总访问次数"
                value={progressData?.total_access || 0}
                prefix={<EyeOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="最近学习记录" style={{ height: '300px' }}>
              <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                {progressData?.recent_notes && progressData.recent_notes.length > 0 ? (
                  progressData.recent_notes.map((note, index) => (
                    <div key={index} style={{ 
                      padding: '8px 0', 
                      borderBottom: index < progressData.recent_notes.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                        {note.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        分类: {note.category} | 访问: {note.access_count}次 | 
                        {new Date(note.last_accessed).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
                    暂无学习记录
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: 16 }}>
          <Col span={24}>
            <Card title="学习统计">
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                      {progressData?.total_notes || 0}
                    </div>
                    <div style={{ color: '#666' }}>上传的资料数量</div>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                      {Math.round((progressData?.total_access || 0) / Math.max(progressData?.total_notes || 1, 1))}
                    </div>
                    <div style={{ color: '#666' }}>平均每份资料访问次数</div>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                      {progressData?.recent_notes?.length || 0}
                    </div>
                    <div style={{ color: '#666' }}>最近活跃的笔记数</div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Progress
