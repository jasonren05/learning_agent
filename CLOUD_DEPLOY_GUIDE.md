# 云端部署指南 - Cloud Studio

本文档详细说明如何在 Cloud Studio 云端服务器上部署全科学习助手应用。

## 🚀 快速部署步骤

### 1. 服务器信息收集

请在云端服务器终端中运行以下命令，并将结果反馈给开发者：

```bash
# 查看系统基本信息
pwd
uname -a
python3 --version
node --version
npm --version

# 检查网络和端口
netstat -tuln | grep LISTEN
env | grep -i port

# 检查项目文件
ls -la
ls -la .vscode/
free -h
```

### 2. 部署准备

#### 自动部署（推荐）
直接点击 Cloud Studio 的"运行"按钮，系统会自动：
- 安装 Python 和 Node.js 依赖
- 启动后端服务（端口 5001）
- 启动前端开发服务器（端口 5173）

#### 手动部署
如果需要手动部署，运行：
```bash
chmod +x cloud_start.sh
./cloud_start.sh
```

### 3. 配置文件说明

#### `.vscode/preview.yml`
已配置为双应用模式：
- **后端服务**：端口 5001，Flask API
- **前端应用**：端口 5173，React + Vite

#### 关键修改内容
1. **CORS 配置**：支持 Cloud Studio 域名
2. **端口绑定**：后端绑定到 0.0.0.0 允许外部访问
3. **自动安装**：启动时自动安装依赖

### 4. 访问应用

部署成功后：
- 🌐 **前端界面**：通过 Cloud Studio 的"Web 预览"功能访问（端口 5173）
- 🔧 **后端API**：`https://your-workspace-id.cloudstudio.net:5001/api/`

### 5. 环境变量配置

首次运行时会自动创建 `.env` 文件，请根据需要配置：
```env
FLASK_SECRET_KEY=your-cloud-secret-key
JWT_SECRET_KEY=your-cloud-jwt-key
ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
VOLC_ACCESS_KEY=your-access-key
VOLC_SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///instance/learning_assistant.db
```

### 6. 功能测试

应用启动后，可以测试以下功能：
- ✅ 用户注册/登录
- ✅ 文件上传功能
- ✅ AI 学习助手
- ✅ 笔记管理
- ✅ 错题本
- ✅ 英语学习

### 7. 故障排除

#### 常见问题
1. **依赖安装失败**：检查网络连接，尝试手动运行 `pip3 install -r requirements.txt`
2. **端口被占用**：检查是否有其他服务占用 5001 或 5173 端口
3. **CORS 错误**：确认已更新 CORS 配置支持云端域名
4. **数据库错误**：确保 `instance` 目录存在且有写权限

#### 调试命令
```bash
# 查看运行日志
ps aux | grep python
ps aux | grep node

# 检查端口占用
netstat -tlnp | grep :5001
netstat -tlnp | grep :5173

# 手动启动后端
python3 app.py

# 手动启动前端
npm run dev
```

### 8. 性能优化建议

- 生产环境建议使用 `gunicorn` 代替 Flask 开发服务器
- 前端可构建为静态文件部署
- 考虑使用 Redis 缓存提升性能

---

📧 如遇到问题，请提供服务器信息收集命令的输出结果以便进一步调试。
