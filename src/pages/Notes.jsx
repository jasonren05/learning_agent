import React, { useState, useEffect } from 'react'
import { 
  Card, 
  Upload, 
  Button, 
  List, 
  Modal, 
  Input, 
  Select, 
  message,
  Typography,
  Spin,
  Tag,
  Alert
} from 'antd'
import { 
  UploadOutlined, 
  FileTextOutlined, 
  FilePdfOutlined,
  FileWordOutlined,
  FileOutlined,
  EditOutlined,
  FileImageOutlined
} from '@ant-design/icons'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { api } from '../utils/api'

const { Title, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select

function Notes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [noteModalVisible, setNoteModalVisible] = useState(false)
  const [enhanceModalVisible, setEnhanceModalVisible] = useState(false)
  const [enhancedContent, setEnhancedContent] = useState('')
  const [enhancing, setEnhancing] = useState(false)

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    try {
      const response = await api.getNotes()
      setNotes(response.data)
    } catch (error) {
      message.error('加载笔记失败')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', file.name)
    formData.append('category', '未分类')

    try {
      await api.uploadFile(formData)
      message.success('文件上传成功')
      onSuccess()
      loadNotes()
    } catch (error) {
      message.error('文件上传失败')
      onError(error)
    } finally {
      setUploading(false)
    }
  }

  const handleNoteClick = async (noteId) => {
    try {
      const response = await api.getNote(noteId)
      setSelectedNote(response.data)
      setNoteModalVisible(true)
    } catch (error) {
      message.error('加载笔记内容失败')
    }
  }

  const handleEnhanceNotes = async () => {
    if (!selectedNote?.content) {
      message.error('没有内容可以补全')
      return
    }

    const isImage = selectedNote.file_type && ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(selectedNote.file_type.toLowerCase())

    setEnhancing(true)
    try {
      const response = await api.enhanceNotes(selectedNote.content, isImage)
      setEnhancedContent(response.data.enhanced_content)
      setEnhanceModalVisible(true)
      if (response.data.save_id) {
        message.success('补全内容已保存到服务器')
      }
    } catch (error) {
      message.error('笔记补全失败')
    } finally {
      setEnhancing(false)
    }
  }

  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#d32f2f' }} />
      case 'docx':
      case 'doc':
        return <FileWordOutlined style={{ color: '#1976d2' }} />
      case 'pptx':
      case 'ppt':
        return <FileOutlined style={{ color: '#ff9800' }} />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp':
        return <FileImageOutlined style={{ color: '#52c41a' }} />
      default:
        return <FileTextOutlined style={{ color: '#4caf50' }} />
    }
  }

  const uploadProps = {
    customRequest: handleUpload,
    showUploadList: false,
    accept: '.pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.bmp,.webp',
    multiple: false
  }

  return (
    <Layout>
      <div className="notes-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2}>笔记管理</Title>
          <div>
            <Upload {...uploadProps}>
              <Button 
                type="primary" 
                icon={<UploadOutlined />}
                loading={uploading}
              >
                上传文件
              </Button>
            </Upload>
          </div>
        </div>

        <Alert
          message="支持的文件格式"
          description="📄 文档: PDF, Word (.doc/.docx), PowerPoint (.ppt/.pptx), 文本文件 (.txt) | 🖼️ 图片: JPG, PNG, GIF, BMP, WebP (支持AI图像识别)"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Card>
          <List
            loading={loading}
            dataSource={notes}
            renderItem={note => (
              <List.Item
                actions={[
                  <Button 
                    type="link" 
                    onClick={() => handleNoteClick(note.id)}
                  >
                    查看
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={getFileIcon(note.file_type)}
                  title={note.title}
                  description={
                    <div>
                      <Tag color="blue">{note.category}</Tag>
                      <span style={{ marginLeft: 8, color: '#666' }}>
                        {new Date(note.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        {/* 笔记详情模态框 */}
        <Modal
          title={selectedNote?.title}
          open={noteModalVisible}
          onCancel={() => setNoteModalVisible(false)}
          width={800}
          footer={[
            <Button key="enhance" onClick={handleEnhanceNotes} loading={enhancing}>
              <EditOutlined /> 补全笔记
            </Button>,
            <Button key="close" onClick={() => setNoteModalVisible(false)}>
              关闭
            </Button>
          ]}
        >
          {selectedNote && (
            <div>
              <Paragraph>
                <strong>分类:</strong> {selectedNote.category}
              </Paragraph>
              <Paragraph>
                <strong>创建时间:</strong> {new Date(selectedNote.created_at).toLocaleString()}
              </Paragraph>
              <Paragraph>
                <strong>内容:</strong>
              </Paragraph>
              <div style={{ 
                maxHeight: '400px', 
                overflow: 'auto', 
                background: '#f5f5f5', 
                padding: '16px',
                borderRadius: '4px'
              }}>
                {selectedNote.file_type && ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(selectedNote.file_type.toLowerCase()) ? (
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={selectedNote.content} 
                      alt={selectedNote.title}
                      style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                    />
                    <p style={{ marginTop: 8, color: '#666' }}>图片内容 - 点击"补全笔记"进行AI分析</p>
                  </div>
                ) : (
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {selectedNote.content}
                  </pre>
                )}
              </div>
            </div>
          )}
        </Modal>

        {/* 补全笔记结果模态框 */}
        <Modal
          title="补全后的笔记"
          open={enhanceModalVisible}
          onCancel={() => setEnhanceModalVisible(false)}
          width={900}
          footer={[
            <Button key="close" onClick={() => setEnhanceModalVisible(false)}>
              关闭
            </Button>
          ]}
        >
          <Alert
            message="内容已保存"
            description="优化后的笔记内容已自动保存到服务器，支持Markdown格式显示"
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <div style={{ 
            maxHeight: '500px', 
            overflow: 'auto', 
            background: '#fff', 
            border: '1px solid #d9d9d9',
            borderRadius: '4px'
          }}>
            <MarkdownRenderer content={enhancedContent} style={{ padding: '16px' }} />
          </div>
        </Modal>
      </div>
    </Layout>
  )
}

export default Notes
