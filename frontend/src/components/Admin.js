import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Admin = () => {

    return (
        <Box style={{ padding: '2rem' }}>
            <Paper elevation={3} style={{ padding: '1.5rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to the Admin Portal.
                </Typography>
                <Typography variant="body1" paragraph>
                    You can manage number of resume templates.
                </Typography>
            </Paper>
        </Box>
    );
    
};
export default Admin;