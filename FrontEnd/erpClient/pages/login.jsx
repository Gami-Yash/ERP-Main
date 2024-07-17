import React, { useState } from 'react';
import LoginComponent from '../src/components/loginComponent';
import SignUpComponent from '../src/components/signupComponent';

const LoginView = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      {isLogin ? <LoginComponent toggleView={toggleView} /> : <SignUpComponent toggleView={toggleView} />}
    </div>
  );
};

export default LoginView;
