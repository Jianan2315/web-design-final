import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const AddJobs = () => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        description: '',
        salary: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/create/job', formData);
            setMessage(response.data.message);
            setFormData({ company: '', title: '', description: '', salary: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error creating job');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Add Job
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Job Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Job Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            margin="normal"
                            type="number"
                            required
                        />
                        <Box mt={2}>
                            <Button fullWidth variant="contained" color="primary" type="submit">
                                Add Job
                            </Button>
                        </Box>
                    </form>
                    {message && (
                        <Typography variant="body1" color="success.main" align="center" style={{ marginTop: '1rem' }}>
                            {message}
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AddJobs;
