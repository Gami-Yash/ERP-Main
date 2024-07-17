import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Template from "../src/components/template";

const AdminPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Template>
            <h1>Admin Page</h1>
        </Template>
    );
};

export default AdminPage;
