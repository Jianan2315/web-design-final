import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper
} from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/login', {
                username,
                password,
            });

            console.log('Login response:', response.data); // 调试日志

            if (response.data.success) {
                localStorage.setItem('userType', response.data.type); // 存储用户类型
                if (response.data.type === 'admin') {
                    navigate('/admin'); // 跳转到管理员页面
                } else {
                    navigate('/home'); // 跳转到主页
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
        <Container
            maxWidth="sm"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1.5rem' }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
