import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

function MarkdownRenderer({ content, style = {} }) {
  return (
    <div 
      style={{ 
        lineHeight: '1.6',
        fontSize: '14px',
        ...style 
      }}
      className="markdown-content"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 自定义组件样式
          h1: ({node, ...props}) => <h1 style={{color: '#1890ff', borderBottom: '2px solid #1890ff', paddingBottom: '8px'}} {...props} />,
          h2: ({node, ...props}) => <h2 style={{color: '#1890ff', borderBottom: '1px solid #d9d9d9', paddingBottom: '4px'}} {...props} />,
          h3: ({node, ...props}) => <h3 style={{color: '#1890ff'}} {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote 
              style={{
                borderLeft: '4px solid #1890ff',
                paddingLeft: '16px',
                margin: '16px 0',
                backgroundColor: '#f6f8fa',
                padding: '12px 16px'
              }} 
              {...props} 
            />
          ),
          code: ({node, inline, ...props}) => 
            inline ? (
              <code 
                style={{
                  backgroundColor: '#f6f8fa',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  fontSize: '0.9em'
                }} 
                {...props} 
              />
            ) : (
              <code {...props} />
            ),
          pre: ({node, ...props}) => (
            <pre 
              style={{
                backgroundColor: '#f6f8fa',
                padding: '16px',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.9em'
              }} 
              {...props} 
            />
          ),
          table: ({node, ...props}) => (
            <table 
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                margin: '16px 0'
              }} 
              {...props} 
            />
          ),
          th: ({node, ...props}) => (
            <th 
              style={{
                border: '1px solid #d0d7de',
                padding: '8px 12px',
                backgroundColor: '#f6f8fa'
              }} 
              {...props} 
            />
          ),
          td: ({node, ...props}) => (
            <td 
              style={{
                border: '1px solid #d0d7de',
                padding: '8px 12px'
              }} 
              {...props} 
            />
          ),
          ul: ({node, ...props}) => (
            <ul style={{paddingLeft: '20px'}} {...props} />
          ),
          ol: ({node, ...props}) => (
            <ol style={{paddingLeft: '20px'}} {...props} />
          ),
          li: ({node, ...props}) => (
            <li style={{marginBottom: '4px'}} {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
