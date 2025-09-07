#!/bin/bash

# 全科学习助手启动脚本

echo "🚀 正在启动全科学习助手..."

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装，请先安装Python3"
    exit 1
fi

# 检查Node.js是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm 未安装，请先安装Node.js"
    exit 1
fi

# 检查.env文件是否存在
if [ ! -f .env ]; then
    echo "⚠️  .env文件不存在，请复制env_example.txt为.env并配置API密钥"
    cp env_example.txt .env
    echo "✅ 已创建.env文件，请编辑该文件并填入您的API密钥"
    exit 1
fi

# 安装Python依赖
echo "📦 安装Python依赖..."
pip3 install -r requirements.txt

# 安装Node.js依赖
echo "📦 安装Node.js依赖..."
npm install

# 创建上传目录
mkdir -p uploads

echo "✅ 依赖安装完成"

# 启动后端服务
echo "🔧 启动后端服务..."
python3 app.py &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动前端开发服务器
echo "🎨 启动前端开发服务器..."
npm run dev &
FRONTEND_PID=$!

echo "🎉 应用启动成功！"
echo "📱 前端地址: http://localhost:5173"
echo "🔧 后端地址: http://localhost:5000"
echo ""
echo "按 Ctrl+C 停止服务"

# 等待用户中断
wait

# 清理进程
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
