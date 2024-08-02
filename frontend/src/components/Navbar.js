import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.contrastText || '#fff', 
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main || '#1976d2', 
}));

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <StyledAppBar position="static">
            <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6">
                        Video App
                    </Typography>
                </Box>
                <Box>
                    <StyledButton onClick={() => navigate("/thumbnailPage")}>
                        Thumbnails
                    </StyledButton>
                    <StyledButton onClick={() => navigate("/")}>
                        Home
                    </StyledButton>
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
}

export default Navbar;
