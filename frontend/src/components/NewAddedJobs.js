import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

const NewaddedJobs = () => {
    const [newJobs, setNewJobs] = useState([]);

    useEffect(() => {
        const fetchNewJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/get/jobs'); // 假设API路径
                setNewJobs(response.data.jobs); // 假设API返回的数据结构为 { jobs: [] }
            } catch (error) {
                console.error('Error fetching new jobs:', error.message);
            }
        };
        fetchNewJobs();
    }, []);

    return (
        <Box style={{ padding: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Recently Added Jobs
            </Typography>
            <Grid container spacing={3}>
                {newJobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {job.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {job.company}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    {job.description}
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    Salary: {job.salary}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {newJobs.length === 0 && (
                <Typography variant="body1" align="center" style={{ marginTop: '2rem' }}>
                    No new jobs added recently.
                </Typography>
            )}
        </Box>
    );
};

export default NewaddedJobs;
