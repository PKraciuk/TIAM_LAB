import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

function Login({ onLoginSuccess })  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nonce, setNonce] = useState('');
    const [error, setError] = useState('');
    const [isNonceFetched, setIsNonceFetched] = useState(false); // Track whether nonce is fetched

    const navigate = useNavigate();

    const fetchNonce = async () => {
        setError('');

        if (!username) {
            setError('Please enter a username first');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/get-nonce/${username}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch nonce');
            }

            setNonce(data.nonce);
            setIsNonceFetched(true); // Set the flag to indicate nonce is fetched
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password || !nonce) {
            setError('Username, password, and nonce are required');
            return;
        }

        const hashedPassword = CryptoJS.MD5(password).toString();
        const combinedHash = CryptoJS.MD5(nonce + hashedPassword).toString();
        console.log(combinedHash);

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password: combinedHash }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data);
            onLoginSuccess();
            navigate('/home'); // Redirect to the home page or dashboard as per your routing setup
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={handleLogin}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            fullWidth
                            id="nonce"
                            label="Nonce"
                            type="text"
                            value={nonce}
                            disabled={true}
                            helperText="Nonce will appear here"
                        />
                    </Box>

                    <Box mb={2} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            onClick={fetchNonce}
                        >
                            Fetch Nonce
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={!isNonceFetched}
                        >
                            Login
                        </Button>
                    </Box>

                    {error && (
                        <Alert severity="error">{error}</Alert>
                    )}
                </form>
            </Paper>
        </Container>
    );
}

export default Login;
