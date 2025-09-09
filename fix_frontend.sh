#!/bin/bash

# 云端前端修复脚本

echo "🔧 修复前端依赖问题..."

# 清理所有缓存和依赖
echo "🧹 清理旧的依赖..."
rm -rf node_modules
rm -f package-lock.json
npm cache clean --force

# 设置npm镜像源（使用腾讯云镜像，更稳定）
echo "🌐 配置npm镜像源..."
npm config set registry https://mirrors.tencent.com/npm/

# 重新安装依赖
echo "📦 重新安装依赖..."
npm install

# 如果还有问题，尝试强制重建
if [ $? -ne 0 ]; then
    echo "⚠️ 标准安装失败，尝试强制重建..."
    npm install --force
fi

# 检查rollup相关模块
echo "🔍 检查rollup模块..."
npm list rollup @rollup/rollup-linux-x64-gnu 2>/dev/null || echo "需要手动安装rollup模块"

# 手动安装可能缺失的模块
echo "🔧 补充安装可能缺失的模块..."
npm install @rollup/rollup-linux-x64-gnu --optional

echo "✅ 前端依赖修复完成，尝试启动..."
npm run dev
