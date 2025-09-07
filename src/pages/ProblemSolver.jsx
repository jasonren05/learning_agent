import React, { useState } from 'react'
import { Card, Input, Button, Typography, message, Spin, Upload, Alert } from 'antd'
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { api } from '../utils/api'

const { Title, Paragraph } = Typography
const { TextArea } = Input

function ProblemSolver() {
  const [problems, setProblems] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [isImageMode, setIsImageMode] = useState(false)

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setProblems(e.target.result)
      setIsImageMode(true)
      setImageFile(file)
    }
    reader.readAsDataURL(file)
    return false // 阻止默认上传行为
  }

  const handleAnalyze = async () => {
    if (!problems.trim()) {
      message.error('请输入题目内容或上传题目图片')
      return
    }

    setLoading(true)
    try {
      const response = await api.analyzeProblems(problems, isImageMode)
      setAnalysis(response.data.analysis)
      if (response.data.save_id) {
        message.success('解析生成成功并已保存到服务器')
      } else {
        message.success('解析生成成功')
      }
    } catch (error) {
      message.error('解析生成失败')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setProblems('')
    setAnalysis('')
    setImageFile(null)
    setIsImageMode(false)
  }

  return (
    <Layout>
      <div className="problem-solver">
        <Title level={2}>
          <QuestionCircleOutlined /> 题目解析助手
        </Title>
        
        <Alert
          message="支持的输入方式"
          description="📝 文字输入: 直接输入题目文字 | 🖼️ 图片上传: 支持JPG, PNG, GIF等格式的题目图片，AI自动识别并解析"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Card style={{ marginBottom: 24 }}>
          <Title level={4}>输入题目</Title>
          <Paragraph type="secondary">
            请输入需要解析的题目内容，或上传题目图片。AI将为您生成详细的解题步骤和分析。
          </Paragraph>
          
          <div style={{ marginBottom: 16 }}>
            <Upload
              accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
              beforeUpload={handleImageUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} style={{ marginRight: 8 }}>
                上传题目图片
              </Button>
            </Upload>
            {imageFile && (
              <span style={{ color: '#52c41a' }}>
                已上传: {imageFile.name}
              </span>
            )}
          </div>

          {isImageMode && problems ? (
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <img 
                src={problems} 
                alt="题目图片"
                style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
              />
            </div>
          ) : (
            <TextArea
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
              placeholder="请输入题目内容，可以包含多个题目..."
              rows={8}
              style={{ marginBottom: 16 }}
            />
          )}
          
          <div style={{ textAlign: 'right' }}>
            <Button 
              style={{ marginRight: 8 }} 
              onClick={handleClear}
            >
              清空
            </Button>
            <Button 
              type="primary"
              onClick={handleAnalyze}
              loading={loading}
              disabled={!problems.trim()}
            >
              生成解析
            </Button>
          </div>
        </Card>

        {analysis && (
          <Card>
            <Title level={4}>详细解析</Title>
            <Alert
              message="解析已保存"
              description="详细解析内容已自动保存到服务器，支持Markdown格式显示"
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <div style={{ 
              background: '#fff', 
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              maxHeight: '500px',
              overflow: 'auto'
            }}>
              <MarkdownRenderer content={analysis} style={{ padding: '16px' }} />
            </div>
          </Card>
        )}

        {loading && (
          <Card style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>
              AI正在为您生成详细解析，请稍候...
            </div>
          </Card>
        )}
      </div>
    </Layout>
  )
}

export default ProblemSolver
