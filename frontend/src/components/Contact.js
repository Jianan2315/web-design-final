import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Contact = () => {
    return (
        <Box style={{ padding: '2rem' }}>
            <Paper elevation={3} style={{ padding: '1.5rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    Email: support@jobportal.com <br />
                    Phone: +1 123 456 7890 <br />
                    Address: 123 Job Portal Ave, Suite 456, Boston, MA, USA
                </Typography>
            </Paper>
        </Box>
    );
    
};

export default Contact;
