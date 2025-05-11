import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Add password state
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', {
        username,
        password,
      });

      // Assuming the response contains a token
      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username); // Optional: Store username if needed

      // Redirect to the home page or dashboard
      router.push('/');
    } catch (error) {
      // Handle error response
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;