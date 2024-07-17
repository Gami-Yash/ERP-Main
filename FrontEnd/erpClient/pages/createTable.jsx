import React, { useState, useEffect } from "react";
import Template from "../src/components/template";
import axios from "axios";
import Loading from "../src/components/loading"; // Ensure the path is correct based on your project structure

const CreateTable = () => {
    const [formData, setFormData] = useState({
        srNo: '',
        name: '',
        module: '',
        subModule: ''
    });

    const [modules, setModules] = useState({});
    const [subModules, setSubModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch('http://localhost:8080/getModules');
                if (response.ok) {
                    const modulesData = await response.json();
                    setModules(modulesData.Module);
                } else {
                    console.log("Failed to fetch modules");
                }
            } catch (error) {
                console.log("Error fetching modules", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchModules();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'module') {
            const selectedModule = modules[value];
            if (selectedModule) {
                setSubModules(selectedModule.Submodules || []);
            } else {
                setSubModules([]);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true); // Set submitting to true when form is being submitted
        try {
            const response = await axios.post('http://localhost:8080/createTable', formData, {
                withCredentials: true
            });
            if (response.status === 200) {
                console.log('Form submitted successfully');
            } else {
                console.log('Form submission failed');
            }
        } catch (error) {
            console.log('Error submitting form', error);
        } finally {
            setSubmitting(false); // Set submitting to false after form submission
        }
    };

    return (
        <Template>
            {(loading || submitting) && <Loading />} {/* Show loading overlay if loading or submitting */}
            <div className="min-h-screen flex flex-col bg-gray-900">
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="srNo" className="text-gray-300">Sr. No.</label>
                        <input
                            type="text"
                            id="srNo"
                            name="srNo"
                            value={formData.srNo}
                            onChange={handleChange}
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off"
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="module" className="text-gray-300">Module</label>
                        <select
                            id="module"
                            name="module"
                            value={formData.module}
                            onChange={handleChange}
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
                        >
                            <option value="">Select Module</option>
                            {Object.keys(modules).map((moduleKey) => (
                                <option key={moduleKey} value={moduleKey}>
                                    {moduleKey}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="subModule" className="text-gray-300">Submodule</label>
                        <select
                            id="subModule"
                            name="subModule"
                            value={formData.subModule}
                            onChange={handleChange}
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
                        >
                            <option value="">Select Submodule</option>
                            {subModules.map((subModule, index) => (
                                <option key={index} value={subModule}>
                                    {subModule}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                        Submit
                    </button>
                </form>
            </div>
        </Template>
    );
};

export default CreateTable;
