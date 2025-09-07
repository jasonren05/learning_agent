# 全科学习助手

一个基于AI的全科学习助手网页应用，支持笔记管理、智能补全、题目解析、英语学习等功能。

## 功能特性

### 🗂️ 基础笔记上传与存储
- 支持多种格式：PDF、Word、PPT、文本文档
- 自动文本提取和分类管理
- 智能内容索引和搜索

### 🧠 基于AI的笔记处理与延申
- **笔记补全**：AI智能补全零碎知识点，完善逻辑关系
- **视频链接推荐**：根据笔记内容推荐相关学习视频
- **关键词查询**：智能关联多个课程内容，便于复习

### 📝 题目解决助手
- **详细解析生成**：为只有答案的题目生成完整解题步骤
- **批量处理**：支持多题目同时解析
- **步骤详解**：提供思路分析和知识点说明

### 🌍 英语学习助手
- **个性化水平设置**：支持小学到雅思托福各个水平
- **智能文章分析**：生成文章导读和词汇释义
- **词汇记忆系统**：记录学习进度，个性化推荐

### 📊 学习进度跟踪
- **访问统计**：记录学习频率和时长
- **掌握度评估**：智能评估知识点掌握程度
- **进度报告**：生成详细的学习分析报告

## 技术栈

### 后端
- **Flask**: Python Web框架
- **SQLAlchemy**: 数据库ORM
- **JWT**: 用户认证
- **豆包AI**: 大语言模型服务

### 前端
- **React**: 用户界面框架
- **Ant Design**: UI组件库
- **Vite**: 构建工具
- **Axios**: HTTP客户端

### 文件处理
- **PyPDF2**: PDF文件解析
- **python-docx**: Word文档处理
- **python-pptx**: PowerPoint处理

## 快速开始

### 1. 环境准备
```bash
# 安装Python依赖
pip install -r requirements.txt

# 安装Node.js依赖
npm install
```

### 2. 配置环境变量
复制 `env_example.txt` 为 `.env` 并填入您的配置：

```bash
# 豆包AI API配置
ARK_API_KEY=your_ark_api_key_here
ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
ARK_MODEL_ID=doubao-seed-1-6-250615

# Flask应用配置
FLASK_SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///learning_assistant.db

# JWT配置
JWT_SECRET_KEY=your_jwt_secret_key_here
```

### 3. 获取API密钥

#### 豆包AI API密钥获取：
1. 访问 [火山方舟平台](https://console.volcengine.com/ark)
2. 注册账号并创建应用
3. 在控制台中生成API密钥
4. 将密钥填入 `ARK_API_KEY` 配置项

#### Flask和JWT密钥生成：
```bash
python3 -c "import secrets; print('FLASK_SECRET_KEY=' + secrets.token_hex(32)); print('JWT_SECRET_KEY=' + secrets.token_hex(32))"
```

### 4. 启动应用

#### 启动后端服务：
```bash
python app.py
```
后端将运行在 http://localhost:5000

#### 启动前端开发服务器：
```bash
npm run dev
```
前端将运行在 http://localhost:5173

### 5. 访问应用
打开浏览器访问 http://localhost:5173 开始使用

## 使用说明

### 注册和登录
1. 首次使用需要注册账号
2. 选择您的英语水平（用于英语学习功能）
3. 登录后进入主界面

### 笔记管理
1. 点击"上传文件"按钮上传学习资料
2. 支持PDF、Word、PPT、文本等格式
3. 系统自动提取文本内容并分类存储
4. 点击"补全笔记"使用AI增强功能

### 题目解析
1. 在题目解析页面输入题目内容
2. 可以输入多个题目
3. AI将生成详细的解题步骤和分析

### 英语学习
1. 粘贴英语文章到输入框
2. 系统根据您的英语水平生成学习材料
3. 包含文章导读、词汇释义、语法分析
4. 标记词汇掌握情况，系统记录学习进度

### 学习进度
1. 查看总体学习统计
2. 分析掌握度和学习建议
3. 查看最近的学习记录

## 项目结构

```
learning_agent/
├── app.py                 # Flask后端主文件
├── requirements.txt       # Python依赖
├── package.json          # Node.js依赖
├── vite.config.js        # Vite配置
├── index.html            # HTML入口
├── .env                  # 环境变量配置
├── uploads/              # 上传文件存储目录
└── src/                  # 前端源码
    ├── main.jsx          # 应用入口
    ├── App.jsx           # 主应用组件
    ├── components/       # 通用组件
    │   └── Layout.jsx    # 布局组件
    ├── pages/            # 页面组件
    │   ├── Login.jsx     # 登录页
    │   ├── Register.jsx  # 注册页
    │   ├── Dashboard.jsx # 仪表板
    │   ├── Notes.jsx     # 笔记管理
    │   ├── EnglishStudy.jsx # 英语学习
    │   ├── ProblemSolver.jsx # 题目解析
    │   └── Progress.jsx  # 学习进度
    ├── utils/            # 工具函数
    │   ├── auth.jsx      # 认证相关
    │   └── api.js        # API接口
    └── styles/           # 样式文件
        ├── index.css     # 全局样式
        └── App.css       # 组件样式
```

## 开发说明

### API接口
- `POST /api/register` - 用户注册
- `POST /api/login` - 用户登录
- `POST /api/upload` - 文件上传
- `GET /api/notes` - 获取笔记列表
- `GET /api/notes/<id>` - 获取笔记详情
- `POST /api/enhance-notes` - 笔记补全
- `POST /api/analyze-problems` - 题目解析
- `POST /api/english-study` - 英语学习材料生成
- `POST /api/vocabulary` - 词汇记录
- `GET /api/progress` - 学习进度

### 数据库模型
- `User` - 用户信息
- `Note` - 笔记内容
- `ProgressRecord` - 学习进度记录
- `VocabularyRecord` - 词汇学习记录

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License
