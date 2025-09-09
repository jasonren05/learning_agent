# Gunicorn 生产环境配置文件
import multiprocessing

# 服务器绑定地址
bind = "0.0.0.0:5001"

# 工作进程数（推荐 CPU 核心数 * 2 + 1）
workers = 4

# 工作进程类型
worker_class = "sync"

# 每个工作进程的最大连接数
worker_connections = 1000

# 超时设置
timeout = 120
keepalive = 2

# 日志配置
loglevel = "info"
accesslog = "-"  # 输出到标准输出
errorlog = "-"   # 输出到标准错误

# 预加载应用
preload_app = True

# 最大请求数，防止内存泄漏
max_requests = 1000
max_requests_jitter = 50

# 进程名称
proc_name = "learning_assistant_api"

# 用户和组（如果需要）
# user = "www-data"
# group = "www-data"
