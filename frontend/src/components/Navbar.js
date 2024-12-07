import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography  } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userType'); // 清除用户类型
        navigate('/'); // 返回登录页面
    };

    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">Resume Builder</Typography>
                <div>
                    {userType === 'employee' && (
                        <>
                            <Button color="inherit" component={Link} to="/home">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/about">
                                Profile
                            </Button>
                            <Button color="inherit" component={Link} to="/jobs">
                                Template
                            </Button>
                            {/* <Button color="inherit" component={Link} to="/companies">
                                Companies
                            </Button>
                            <Button color="inherit" component={Link} to="/contact">
                                Contact
                            </Button>
                 */}
                            
                        </>
                    )}
                    {userType === 'admin' && (
                        <>
                            <Button color="inherit" component={Link} to="/admin">
                                Admin
                            </Button>
                            {/* <Button color="inherit" component={Link} to="/employees">
                                Employees
                            </Button>
                            <Button color="inherit" component={Link} to="/add-jobs">
                                Add Jobs
                            </Button> */}
                        </>
                    )}
                    <Button color="inherit" component={Link} to="http://127.0.0.1:3001/frontend/public/index2.html">
                        Exit
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
