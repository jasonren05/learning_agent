#!/usr/bin/env python3
"""
测试新功能的脚本
"""

import requests
import json
import base64

# 测试配置
BASE_URL = "http://localhost:5001/api"
TEST_USER = {"username": "test1", "password": "123456"}

def test_login():
    """测试登录功能"""
    print("🔐 测试登录...")
    response = requests.post(f"{BASE_URL}/login", json=TEST_USER)
    if response.status_code == 200:
        token = response.json()["access_token"]
        print("✅ 登录成功")
        return token
    else:
        print("❌ 登录失败")
        return None

def test_enhanced_logging(token):
    """测试增强的日志功能"""
    print("\n📝 测试笔记补全（文本）...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "content": "这是一个测试笔记，内容比较简单。",
        "is_image": False
    }
    
    response = requests.post(f"{BASE_URL}/enhance-notes", json=data, headers=headers)
    if response.status_code == 200:
        result = response.json()
        print("✅ 笔记补全成功")
        print(f"📄 保存ID: {result.get('save_id')}")
        return True
    else:
        print("❌ 笔记补全失败")
        return False

def test_problem_analysis(token):
    """测试题目解析功能"""
    print("\n🧮 测试题目解析（文本）...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "problems": "求解方程 x^2 + 5x + 6 = 0",
        "is_image": False
    }
    
    response = requests.post(f"{BASE_URL}/analyze-problems", json=data, headers=headers)
    if response.status_code == 200:
        result = response.json()
        print("✅ 题目解析成功")
        print(f"📄 保存ID: {result.get('save_id')}")
        return True
    else:
        print("❌ 题目解析失败")
        return False

def test_english_study(token):
    """测试英语学习功能"""
    print("\n🌍 测试英语学习材料生成...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "text": "Hello world! This is a simple English sentence for testing.",
        "is_image": False
    }
    
    response = requests.post(f"{BASE_URL}/english-study", json=data, headers=headers)
    if response.status_code == 200:
        result = response.json()
        print("✅ 英语学习材料生成成功")
        print(f"📄 保存ID: {result.get('save_id')}")
        return True
    else:
        print("❌ 英语学习材料生成失败")
        return False

def main():
    print("🚀 开始测试新功能...")
    
    # 登录
    token = test_login()
    if not token:
        print("❌ 无法继续测试，登录失败")
        return
    
    # 测试各项功能
    results = []
    results.append(test_enhanced_logging(token))
    results.append(test_problem_analysis(token))
    results.append(test_english_study(token))
    
    # 统计结果
    success_count = sum(results)
    total_count = len(results)
    
    print(f"\n📊 测试结果: {success_count}/{total_count} 项功能正常")
    
    if success_count == total_count:
        print("🎉 所有功能测试通过！")
    else:
        print("⚠️  部分功能需要检查")

if __name__ == "__main__":
    main()
