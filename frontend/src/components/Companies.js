// File: src/components/Companies.js
import React from 'react';
import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const companies = [
    { name: 'TechCorp', logo: 'http://localhost:5001/images/techcorp.png' },
    { name: 'Innovate Ltd', logo: 'http://localhost:5001/images/innovate.png' },
    { name: 'Amazon', logo: 'http://localhost:5001/images/amazon.png' },
    { name: 'Google', logo: 'http://localhost:5001/images/google.png' }
];

const Companies = () => {


    return (
        <Grid container spacing={3} style={{ padding: '2rem' }}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom>
                    Partnered Companies
                </Typography>
            </Grid>
            {companies.map((company, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card elevation={3}>
                        <CardMedia
                            component="img"
                            alt={company.name}
                            height="400"
                            image={company.logo}
                        />
                        <CardContent>
                            <Typography variant="h6">{company.name}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Companies;