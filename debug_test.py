#!/usr/bin/env python3
import requests
import json

# 测试基本连接
try:
    print("测试基本连接...")
    response = requests.get("http://localhost:5001")
    print(f"GET / 状态码: {response.status_code}")
    print(f"响应内容: {response.text[:100]}...")
except Exception as e:
    print(f"GET请求异常: {e}")

# 测试登录API
try:
    print("\n测试登录API...")
    url = "http://localhost:5001/api/login"
    data = {"username": "test1", "password": "123456"}
    headers = {"Content-Type": "application/json"}
    
    print(f"URL: {url}")
    print(f"数据: {data}")
    
    response = requests.post(url, json=data, headers=headers, timeout=10)
    print(f"登录API状态码: {response.status_code}")
    print(f"响应头: {response.headers}")
    print(f"响应内容: {response.text}")
    
except Exception as e:
    print(f"登录API异常: {e}")
    import traceback
    traceback.print_exc()


