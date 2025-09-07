#!/usr/bin/env python3
"""
创建测试用户的脚本
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, User
from werkzeug.security import generate_password_hash

def create_test_users():
    """创建5个测试用户"""
    test_users = [
        {
            'username': 'test1',
            'email': 'test1@example.com',
            'password': '123456',
            'english_level': 'high_school'
        },
        {
            'username': 'test2', 
            'email': 'test2@example.com',
            'password': '123456',
            'english_level': 'cet4'
        },
        {
            'username': 'test3',
            'email': 'test3@example.com', 
            'password': '123456',
            'english_level': 'cet6'
        },
        {
            'username': 'test4',
            'email': 'test4@example.com',
            'password': '123456', 
            'english_level': 'middle'
        },
        {
            'username': 'test5',
            'email': 'test5@example.com',
            'password': '123456',
            'english_level': 'ielts_toefl'
        }
    ]
    
    with app.app_context():
        # 确保数据库表存在
        db.create_all()
        
        created_count = 0
        for user_data in test_users:
            # 检查用户是否已存在
            existing_user = User.query.filter_by(username=user_data['username']).first()
            if existing_user:
                print(f"用户 {user_data['username']} 已存在，跳过")
                continue
                
            # 创建新用户
            user = User(
                username=user_data['username'],
                email=user_data['email'],
                password_hash=generate_password_hash(user_data['password']),
                english_level=user_data['english_level']
            )
            
            db.session.add(user)
            created_count += 1
            print(f"创建用户: {user_data['username']} (密码: {user_data['password']}, 英语水平: {user_data['english_level']})")
        
        if created_count > 0:
            db.session.commit()
            print(f"\n✅ 成功创建 {created_count} 个测试用户")
        else:
            print("\n✅ 所有测试用户已存在")
            
        print("\n📋 测试用户列表:")
        print("=" * 50)
        for user_data in test_users:
            print(f"用户名: {user_data['username']:<10} 密码: {user_data['password']:<10} 英语水平: {user_data['english_level']}")
        print("=" * 50)

if __name__ == '__main__':
    create_test_users()
