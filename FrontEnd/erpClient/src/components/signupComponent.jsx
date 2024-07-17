import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';










const SignUpComponent = ({ toggleView }) => {

  const navigate = useNavigate()

  const [signupData, setSignupData] = useState({
    name:'',
    email:'',
    password:''
  })


  const handelChange = (e) =>{
    const {name,value} = e.target;
    setSignupData({
        ...signupData,
        [name] : value
    })
}

  const handelSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/signup',signupData)
      if(response.data.success){
        navigate('/')
        window.location.reload();
      }else{
        alert(response.data.message)
      }
    } catch (error) {
      console.log("Error generated",error)
    }
  }





  return (
    <div className="w-full max-w-2xl h-full max-h-screen mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-md"> {/* Increased width and height, dark mode */}
      <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>
      <form onSubmit={handelSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name='name'
            placeholder="Username"
            value={signupData.name}
            onChange={handelChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name='email'
            placeholder="E-mail"
            value={signupData.email}
            onChange={handelChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name='password'
            value={signupData.password}
            placeholder="Confirm Password"
            onChange={handelChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            onClick={toggleView}
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpComponent;
