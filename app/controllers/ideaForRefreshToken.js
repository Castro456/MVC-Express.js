const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // For generating refresh tokens
const app = express();

// ... (other imports and configurations)

// Refresh token storage (In a real app, use a database)
const refreshTokens = {}; // In-memory storage (for demonstration).  Use a database in production.

app.post('/login', async (req, res) => {
  // ... (authentication logic - same as before)

  // 1. JWT Creation (short expiry)
  const payload = { userId: user.id };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // 1-hour expiry

  // 2. Refresh Token Creation
  const refreshToken = crypto.randomBytes(64).toString('hex'); // Generate a strong refresh token

  // 3. Store Refresh Token (In a database in production)
  refreshTokens[user.id] = refreshToken;  // In-memory storage for example only

  // 4. Session Establishment (Store both tokens)
  req.session.accessToken = accessToken;
  req.session.refreshToken = refreshToken;
  req.session.user = { id: user.id, username: user.username, role: user.role };

  res.json({ accessToken, refreshToken }); // Send both tokens to the client
});


app.post('/refresh_token', (req, res) => {
  const { refreshToken } = req.body;  // Get refresh token from the client

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  const userId = Object.keys(refreshTokens).find(key => refreshTokens[key] === refreshToken);

  if (!userId) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  try {
    const user = {id: userId, username: req.session.user.username, role: req.session.user.role} // Get user information from your database using userId
    // 1. Create new Access Token
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // 2. (Optional) Generate a new refresh token (for added security - recommended)
    const newRefreshToken = crypto.randomBytes(64).toString('hex');
    refreshTokens[user.id] = newRefreshToken;

    req.session.accessToken = accessToken;
    req.session.refreshToken = newRefreshToken;

    res.json({ accessToken, refreshToken: newRefreshToken }); // Send back the new tokens
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ... (authenticate middleware - same as before)

// Client-side (example using fetch):
// ... (After initial login, store accessToken and refreshToken)

// Function to refresh the access token
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token from local storage or cookie
    try {
        const response = await fetch('/refresh_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token'); // Handle error (e.g., redirect to login)
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken); // Update access token in local storage or cookie
        localStorage.setItem('refreshToken', data.refreshToken); // Update refresh token in local storage or cookie
        return data.accessToken; // Return the new access token
    } catch (error) {
        console.error('Token refresh error:', error);
        // Handle error appropriately (e.g., redirect to login)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Or your login page
        return null;
    }
}

// Example usage in a protected API call
async function callProtectedAPI() {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        accessToken = await refreshAccessToken(); // Try to refresh the token
        if (!accessToken) {
            return; // User is not logged in
        }
    }

    try {
        const response = await fetch('/profile', { // Your protected API endpoint
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Use Bearer token
            },
        });
        // ... handle response
    } catch (error) {
        console.error('API call error:', error);
    }
}

// ... (rest of your code)