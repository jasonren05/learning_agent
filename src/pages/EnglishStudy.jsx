import React, { useState } from 'react'
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  message, 
  Spin,
  Tag,
  Space,
  Divider,
  Upload,
  Alert
} from 'antd'
import { BookOutlined, CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { api } from '../utils/api'

const { Title, Paragraph } = Typography
const { TextArea } = Input

function EnglishStudy() {
  const [articleText, setArticleText] = useState('')
  const [studyMaterial, setStudyMaterial] = useState('')
  const [loading, setLoading] = useState(false)
  const [vocabularyWords, setVocabularyWords] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [isImageMode, setIsImageMode] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileUpload = ({ file }) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (file.type.startsWith('image/')) {
        setArticleText(e.target.result)
        setIsImageMode(true)
        setImageFile(file)
      } else {
        setArticleText(e.target.result)
        setIsImageMode(false)
      }
      setUploadedFiles([file])
    }
    
    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
    return false
  }

  const handleGenerateStudyMaterial = async () => {
    if (!articleText.trim()) {
      message.error('请输入英语文章内容或上传文件')
      return
    }

    setLoading(true)
    try {
      const response = await api.generateEnglishStudy(articleText, isImageMode)
      setStudyMaterial(response.data.study_material)
      
      // 提取词汇（这里简化处理，实际应该从AI返回的结果中解析）
      const words = extractVocabularyWords(response.data.study_material)
      setVocabularyWords(words)
      
      if (response.data.save_id) {
        message.success('学习材料生成成功并已保存到服务器')
      } else {
        message.success('学习材料生成成功')
      }
    } catch (error) {
      message.error('学习材料生成失败')
    } finally {
      setLoading(false)
    }
  }

  const extractVocabularyWords = (material) => {
    // 简化的词汇提取，实际应该更智能
    const wordPattern = /\b[A-Za-z]{4,}\b/g
    const matches = material.match(wordPattern) || []
    const uniqueWords = [...new Set(matches)]
    return uniqueWords.slice(0, 10).map(word => ({
      word: word.toLowerCase(),
      known: null
    }))
  }

  const handleVocabularyChoice = async (word, known) => {
    try {
      await api.recordVocabulary(word, known)
      setVocabularyWords(prev => 
        prev.map(item => 
          item.word === word ? { ...item, known } : item
        )
      )
      message.success(`已记录: ${word} - ${known ? '我会了' : '我不会'}`)
    } catch (error) {
      message.error('记录失败')
    }
  }

  const handleClear = () => {
    setArticleText('')
    setStudyMaterial('')
    setVocabularyWords([])
    setImageFile(null)
    setIsImageMode(false)
    setUploadedFiles([])
  }

  return (
    <Layout>
      <div className="english-study">
        <Title level={2}>
          <BookOutlined /> 英语学习助手
        </Title>
        
        <Alert
          message="支持的输入方式"
          description="📝 文字输入: 直接输入或粘贴英语文章 | 📄 文件上传: Word (.doc/.docx), 文本文件 (.txt) | 🖼️ 图片上传: JPG, PNG等格式的英语图片，AI自动识别文字内容"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <Card style={{ marginBottom: 24 }}>
          <Title level={4}>输入英语文章</Title>
          <Paragraph type="secondary">
            请输入或上传您想要学习的英语文章，系统将根据您的英语水平生成个性化的学习材料。
          </Paragraph>
          
          <div style={{ marginBottom: 16 }}>
            <Upload
              accept=".txt,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp"
              beforeUpload={handleFileUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} style={{ marginRight: 8 }}>
                上传文件
              </Button>
            </Upload>
            {uploadedFiles.length > 0 && (
              <span style={{ color: '#52c41a' }}>
                已上传: {uploadedFiles[0].name}
              </span>
            )}
          </div>

          {isImageMode && articleText ? (
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <img 
                src={articleText} 
                alt="英语文章图片"
                style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
              />
            </div>
          ) : (
            <TextArea
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              placeholder="请粘贴英语文章内容..."
              rows={10}
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
              onClick={handleGenerateStudyMaterial}
              loading={loading}
              disabled={!articleText.trim()}
            >
              生成学习材料
            </Button>
          </div>
        </Card>

        {studyMaterial && (
          <>
            <Card style={{ marginBottom: 24 }}>
              <Title level={4}>学习材料</Title>
              <Alert
                message="学习材料已保存"
                description="个性化学习材料已自动保存到服务器，支持Markdown格式显示"
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <div style={{ 
                background: '#fff', 
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                maxHeight: '400px',
                overflow: 'auto'
              }}>
                <MarkdownRenderer content={studyMaterial} style={{ padding: '16px' }} />
              </div>
            </Card>

            {vocabularyWords.length > 0 && (
              <Card>
                <Title level={4}>词汇练习</Title>
                <Paragraph type="secondary">
                  请标记以下词汇的掌握情况，系统将记录您的学习进度：
                </Paragraph>
                
                <div style={{ marginTop: 16 }}>
                  {vocabularyWords.map(({ word, known }) => (
                    <div key={word} style={{ 
                      marginBottom: 16, 
                      padding: '12px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {word}
                      </span>
                      <Space>
                        {known === null ? (
                          <>
                            <Button 
                              type="primary"
                              icon={<CheckOutlined />}
                              onClick={() => handleVocabularyChoice(word, true)}
                            >
                              我会了
                            </Button>
                            <Button 
                              danger
                              icon={<CloseOutlined />}
                              onClick={() => handleVocabularyChoice(word, false)}
                            >
                              我不会
                            </Button>
                          </>
                        ) : (
                          <Tag color={known ? 'green' : 'red'}>
                            {known ? '已掌握' : '需要学习'}
                          </Tag>
                        )}
                      </Space>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}

        {loading && (
          <Card style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>
              AI正在根据您的英语水平生成个性化学习材料，请稍候...
            </div>
          </Card>
        )}
      </div>
    </Layout>
  )
}

export default EnglishStudy
