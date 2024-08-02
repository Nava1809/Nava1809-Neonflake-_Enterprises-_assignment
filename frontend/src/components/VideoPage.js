import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
}));

const VideoBox = styled(Box)(({ theme }) => ({
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '800px',
    position: 'relative',
    backgroundColor: '#fff',
    '& video': {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
}));

const VideoTitle = styled(Typography)(({ theme }) => ({
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
}));

function VideoPage() {
    const { id } = useParams(); 
    const [video, setVideo] = useState(null);

    useEffect(() => {
        axios.get(`https://nava1809-neonflake-enterprises-kymn.onrender.com/video/${id}`)
            .then((res) => {
                console.log(res.data); 
                setVideo(res.data.data); 
            })
            .catch((e) => console.log(e));
    }, [id]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <StyledContainer>
            <VideoTitle variant="h4">{video.title}</VideoTitle>
            <VideoBox>
                <video controls>
                    <source src={video.videoFile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </VideoBox>
        </StyledContainer>
    );
}

export default VideoPage;
