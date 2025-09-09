#!/bin/bash

# 云端服务器启动脚本 - Cloud Studio 专用

echo "🌟 正在启动全科学习助手（云端版本）..."

# 设置工作目录
cd /workspace || exit 1

# 检查并创建必要的目录
mkdir -p uploads
mkdir -p instance
mkdir -p enhanced_content

# 检查.env文件，如果不存在则创建默认版本
if [ ! -f .env ]; then
    echo "⚠️  正在创建默认 .env 配置文件..."
    cp env_example.txt .env 2>/dev/null || echo "FLASK_SECRET_KEY=your-cloud-secret-key
JWT_SECRET_KEY=your-cloud-jwt-key
ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
VOLC_ACCESS_KEY=your-access-key
VOLC_SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///instance/learning_assistant.db" > .env
    echo "✅ 已创建 .env 文件，请根据需要配置 API 密钥"
fi

# 安装 Python 依赖
echo "📦 安装 Python 依赖..."
pip3 install --user -r requirements.txt || pip install --user -r requirements.txt

# 安装 Node.js 依赖
echo "📦 安装 Node.js 依赖..."
npm install

echo "✅ 云端环境配置完成！"
echo "🚀 应用将通过 Cloud Studio 运行按钮启动"
echo "📱 前端将运行在 5173 端口"
echo "🔧 后端将运行在 5001 端口"
