import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './authProvider';

const Template = ({ children }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { auth } = useContext(AuthContext);
    const [isAdmin, setAdmin] = useState(false);
    const [modules, setModules] = useState({});

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (auth && auth.isadmin) {
                    const response = await fetch('http://localhost:8080/getModules');
                    if (response.ok) {
                        const modulesData = await response.json();
                        setModules(modulesData.Module);
                        setAdmin(true);
                    } else {
                        console.error('Failed to fetch modules');
                    }
                }
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };

        fetchData();
    }, [auth]);

    return (
        <div className="flex flex-col">
            <nav className="bg-gray-800 p-3 flex justify-between items-center">
                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className="text-white px-3 py-2 rounded hover:bg-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    {menuOpen && (
                        <div className="absolute bg-gray-700 rounded mt-2 shadow-lg w-64 h-64 overflow-auto">
                            {isAdmin ? (
                                <>
                                    <Link to="/create-table" className="block text-white px-3 py-2 hover:bg-gray-600">
                                        Create Table
                                    </Link>
                                    <Link to="/create-fields" className="block text-white px-3 py-2 hover:bg-gray-600">
                                        Create Fields
                                    </Link>
                                    {modules['ERP Admin'] && (
                                        <div className="text-white px-3 py-2">
                                            <h3 className="font-bold">ERP Admin</h3>
                                            <ul>
                                                {modules['ERP Admin'].Submodules.map((submodule, index) => (
                                                    <li key={index} className="hover:bg-gray-600 px-3 py-1">
                                                        <Link to={`/${submodule.replace(/\s+/g, '').toLowerCase()}`}>
                                                            {submodule}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <h1 className="text-white px-3 py-2">No Permission given</h1>
                            )}
                        </div>
                    )}
                </div>
                <button onClick={logout} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                    Logout
                </button>
            </nav>
            <main className="flex-1 p-0">
                {children}
            </main>
        </div>
    );
};

export default Template;
