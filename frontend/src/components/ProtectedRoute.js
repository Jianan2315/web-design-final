import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedTypes, children }) => {
    const userType = localStorage.getItem('userType'); // 从 localStorage 获取用户类型

    if (!userType || !allowedTypes.includes(userType)) {
        // 如果用户类型不匹配或未登录，则重定向到登录页面
        return <Navigate to="/" replace />;
    }

    return children; // 允许访问匹配的页面
};

export default ProtectedRoute;