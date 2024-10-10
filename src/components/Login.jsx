import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/user/login`,
          { email, password, confirmPassword, role: 'Admin' },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo('/');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className='container form-component'>
        <img src='./logo_zeecare.png' alt='' />
        <h1 className='form-title'>WELCOME TO ZEECARE</h1>
        <p>Only Admin are Allowed to access this resources</p>

        <form onSubmit={handleLogin}>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div style={{ justifyContent: 'center', alignItems: 'center' }}>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
