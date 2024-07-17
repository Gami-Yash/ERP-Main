import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authProvider';

const LoginComponent = ({ toggleView }) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success && result.user.isadmin) {
        setAuth({ isAuthenticated: true, user: result.user,isadmin:true });
        navigate('/demoPage');
      } else if(result.success){
        setAuth({ isAuthenticated: true, user: result.user, isadmin:false});
        navigate('/home');
      }else {
        console.log("Login failed:");
      }
    } catch (error) {
      console.error("Internal server error in to login component:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'password') setPassword(value);
  };

  return (
    
      <div className="w-full max-w-2xl h-full max-h-screen mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
              onClick={toggleView}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
  );
};

export default LoginComponent;
