import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/employees'); // 假设API路径
                setEmployees(response.data.employees); // 假设API返回的数据结构为 { employees: [] }
            } catch (error) {
                console.error('Error fetching employees:', error.message);
            }
        };
        fetchEmployees();
    }, []);

    return (
        <Box style={{ padding: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Employee Directory
            </Typography>
            <Grid container spacing={3}>
                {employees.map((employee, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {employee.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Email: {employee.email}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Role: {employee.type}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {employees.length === 0 && (
                <Typography variant="body1" align="center" style={{ marginTop: '2rem' }}>
                    No employees found.
                </Typography>
            )}
        </Box>
    );
};

export default Employees;
