
// File: src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/login', {
                username,
                password
            });
    
            console.log('Login response:', response.data); // 调试日志
    
            if (response.data.success) {
                localStorage.setItem('userType', response.data.type); // 存储用户类型
                if(response.data.type === 'admin') {
                    window.location.href = '/admin'; // 跳转到管理员页面
                }else {
                    window.location.href = '/home'; // 跳转到主页
                }
            } else {
                alert('Invalid credentials'); // 提示登录失败
            }
        } catch (error) {
            console.error('Login error:', error.message); // 打印错误日志
            alert('Failed to login. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;