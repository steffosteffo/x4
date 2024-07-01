import React, { useState } from 'react';
import axios from 'axios'; 

function LoginForm({ onLogin, onLogout }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      console.log('Fetching users from the database...');
      const usersResponse = await axios.get('http://localhost:3000/api/anames');
      const users = usersResponse.data;
      console.log('Users fetched:', users);

      // Check if the provided username and password match any user in the list
      const user = users.find(
        (user) => user.steffoname === username && user.alosen === password 
      );

      if (user) {
        if (user.antal === 1) {
          alert('This user is already logged in');
          return;
        }

        console.log('User ID:', user._id); // Log the user ID

        if (!user._id) {
          throw new Error('User ID is undefined');
        }

        // Make the PUT request to the backend to update the user's `antal` status
        const response = await axios.put(`http://localhost:3000/api/anames/${user._id}`, {
          steffoname: user.steffoname,
          alosen: user.alosen,
          antal: 1
        });

        console.log('Response from server:', response.data);

        // Log the browser ID and timestamp
        const browserID = navigator.userAgent; // Browser ID
        const timeStamp = new Date().toISOString(); // Timestamp
        console.log('Browser ID:', browserID);
        console.log('Timestamp:', timeStamp);

        // Call the onLogin function
        onLogin(user);  // Pass the username to the onLogin function
       
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>
          Användarnamn:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>
      </div>
      <div>
        <label>
          Lösenord:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
      </div>
      <button type="submit">Logga in</button>
    </form>
  );
}

export default LoginForm;
