import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Postform from './components/Postform';
import ThumbnailPage from './components/ThumbnailPage';
import VideoPage from './components/VideoPage';
import Navbar from './components/Navbar';
import './App.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            contrastText: '#fff',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Postform />} />
                        <Route path="/thumbnailPage" element={<ThumbnailPage />} />
                        <Route path="/video/:id" element={<VideoPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
