import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';

function Postform() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailName, setThumbnailName] = useState("");
    const [videoName, setVideoName] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const MAX_FILE_SIZE = 100 * 1024 * 1024; 

    function PostData() {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (thumbnail) formData.append('thumbnail', thumbnail);
        if (videoFile) formData.append('videoFile', videoFile);

        fetch('https://nava1809-neonflake-enterprises-kymn.onrender.com/posts', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log("API Response:", data);
            if (data.status === "ok") {
                
                setSuccessMessage(true);
                setTitle("");
                setDescription("");
                setThumbnail(null);
                setVideoFile(null);
                setThumbnailName("");
                setVideoName("");
                setErrorMessage("");
                navigate('/thumbnailpage'); 
            } else {
                setErrorMessage("Failed to post. Please try again.");
            }
        })
        .catch(e => {
            console.error("Error:", e);
            setErrorMessage("An error occurred. Please try again.");
        });
    }

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
        setErrorMessage("");
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setErrorMessage(`File size should not exceed 100 MB.`);
                if (fileType === 'thumbnail') setThumbnail(null);
                if (fileType === 'video') setVideoFile(null);
                return;
            }
            if (fileType === 'thumbnail') {
                setThumbnail(file);
                setThumbnailName(file.name);
            }
            if (fileType === 'video') {
                setVideoFile(file);
                setVideoName(file.name);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                }}
            >
                <Typography component="h1" variant="h5">
                    Upload
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        inputProps={{ maxLength: 50 }}
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 200 }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Upload Thumbnail
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleFileChange(e, 'thumbnail')}
                        />
                    </Button>
                    {thumbnailName && (
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Selected Thumbnail: {thumbnailName}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Upload Video
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleFileChange(e, 'video')}
                        />
                    </Button>
                    {videoName && (
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Selected Video: {videoName}
                        </Typography>
                    )}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={PostData}
                        sx={{ mt: 2 }}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={successMessage || Boolean(errorMessage)}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                {successMessage ? (
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Posted successfully!
                    </Alert>
                ) : (
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                )}
            </Snackbar>
        </Container>
    );
}

export default Postform;
