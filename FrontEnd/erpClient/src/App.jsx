// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/authProvider';
import ProtectedRoute from '../src/components/protectedRoute';
import LoginView from '../pages/login';
import Home from '../pages/home';
import Logout from '../src/components/logout'
import LoginComponent from './components/loginComponent';
import CheckPage from '../pages/checking';
import AdminProtectedRoute from './components/adminProtectedRoute';
import AdminPage from '../pages/AdminPage';
import CreateTable from '../pages/createTable';
import CreateFields from '../pages/createFields';
import UserPermision from '../pages/userPermission';


const App = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* Normal Routes */}
                <Route path="/" element={<LoginView />} />
                <Route path='/logout' element={<Logout />} />
                <Route path="/login" element={<LoginComponent />} />



                {/* Protected Routes */}
                <Route path="/home" element={<ProtectedRoute element={Home} />} />
                <Route  path="/check" element={<ProtectedRoute element={CheckPage} />} />



                {/* ADMIN PROTECTED ROUTES */}
                <Route path="/demoPage" element={<AdminProtectedRoute element={AdminPage} />} />
                <Route path="/create-table" element={<AdminProtectedRoute element={CreateTable}/>} />
                <Route path="/create-fields" element={<AdminProtectedRoute element={CreateFields}/>} />
                <Route path="/userpermission" element={<AdminProtectedRoute element={UserPermision}/>} />
                


            </Routes>
        </AuthProvider>
    );
};

export default App;
