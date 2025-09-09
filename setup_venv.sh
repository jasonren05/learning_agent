#!/bin/bash

# 学习助手项目虚拟环境设置脚本
# 用于解决 pip root 用户警告和依赖隔离

echo "🔧 设置 Python 虚拟环境..."

# 设置 Python 版本
pyenv shell 3.11.1

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
source venv/bin/activate

# 升级 pip
pip install --upgrade pip

# 安装依赖
pip install -r requirements.txt

echo "✅ 虚拟环境设置完成！"
echo ""
echo "📋 使用说明："
echo "1. 激活虚拟环境: source venv/bin/activate"
echo "2. 启动后端服务: gunicorn -c gunicorn.conf.py app:app"
echo "3. 启动前端服务: npm run dev -- --host 0.0.0.0"
echo "4. 停用虚拟环境: deactivate"
