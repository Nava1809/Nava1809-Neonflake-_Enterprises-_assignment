import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    marginBottom: '20px',
    margin: 'auto',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
    },
}));

const StyledMedia = styled(CardMedia)(({ theme }) => ({
    height: 200,
    borderRadius: '15px 15px 0 0',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: '40px',
    padding: '0 20px',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
}));

const Background = styled('div')(({ theme }) => ({
    background: 'url("https://cdn.pixabay.com/photo/2022/09/21/17/02/blue-background-7470781_640.jpg") no-repeat center center/cover',
    minHeight: '100vh',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    color: 'black',
}));

const Header = styled(Typography)(({ theme }) => ({
    marginBottom: '20px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
}));

function ThumbnailPage() {
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        axios.get('https://nava1809-neonflake-enterprises-kymn.onrender.com/')
            .then((res) => {
                setThumbnails(res.data.data);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <Background>
            <Header variant="h2">Video Gallery</Header>
            <StyledContainer>
                <Grid container spacing={4}>
                    {thumbnails.map((data) => (
                        <Grid item xs={12} sm={6} md={4} key={data._id}>
                            <StyledCard>
                                <Link to={`/video/${data._id}`} style={{ textDecoration: 'none' }}>
                                    <StyledMedia
                                        image={data.thumbnail}
                                        title={data.title}
                                    />
                                </Link>
                                <CardContent>
                                    <StyledTypography variant="h5">
                                        <Link to={`/video/${data._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {data.title}
                                        </Link>
                                    </StyledTypography>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </StyledContainer>
        </Background>
    );
}

export default ThumbnailPage;
