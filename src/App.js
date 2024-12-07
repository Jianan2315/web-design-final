import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Jobs from './components/Jobs';
import Companies from './components/Companies';
import Contact from './components/Contact';
import Employees from './components/Employees';
import ProtectedRoute from './components/ProtectedRoute';
import AddJobs from './components/AddJobs'; // 导入 AddJobs 组件
import Admin from './components/Admin';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* 公共页面 */}
                <Route path="/" element={<Login />} />

                {/* 员工页面 */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute allowedTypes={['employee']}>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <ProtectedRoute allowedTypes={['employee']}>
                            <About />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute allowedTypes={['employee']}>
                            <Jobs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/companies"
                    element={
                        <ProtectedRoute allowedTypes={['employee']}>
                            <Companies />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <ProtectedRoute allowedTypes={['employee']}>
                            <Contact />
                        </ProtectedRoute>
                    }
                />
                

                {/* 管理员页面 */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedTypes={['admin']}>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                {/* <Route
                    path="/employees"
                    element={
                        <ProtectedRoute allowedTypes={['admin']}>
                            <Employees />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-jobs"
                    element={
                        <ProtectedRoute allowedTypes={['admin']}>
                            <AddJobs />
                        </ProtectedRoute>
                    }
                /> */}
            </Routes>
        </Router>
    );
};

export default App;
