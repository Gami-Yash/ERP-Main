import React, { useState, useEffect } from "react";
import Template from "../src/components/template";
import axios from "axios";
import Loading from "../src/components/loading";

const CreateFields = () => {
    const [fieldData, setFieldData] = useState({
        srNo: '',
        module: '', 
        formName: '',
        fieldName: '',
        fieldType: '',
        required: '',
        editable: ''
    });
    const [modules, setModules] = useState([]);
    const [submodules, setSubmodules] = useState([]);
    const [fields, setFields] = useState([]);
    const [loadingFields, setLoadingFields] = useState(true);
    const [loadingModules, setLoadingModules] = useState(true);
    const [loadingSubmodules, setLoadingSubmodules] = useState(false); 

    useEffect(() => {
        axios.get('http://localhost:8080/getModules')
            .then(response => {
                const moduleNames = Object.keys(response.data.Module);
                setModules(moduleNames);
                setLoadingModules(false); 
            })
            .catch((error) => {
                console.log('error fetching module', error);
                setLoadingModules(false); 
            });
    }, []);

    useEffect(() => {
        if (fieldData.module) {
            setLoadingSubmodules(true); 
            axios.get('http://localhost:8080/getModules', {
                params: { module: fieldData.module }
            })
            .then(response => {
                const submoduleNames = response.data.map(submodule => submodule.name);
                setSubmodules(submoduleNames);
                setLoadingSubmodules(false);
            })
            .catch(error => {
                console.error("Error fetching submodules", error);
                setLoadingSubmodules(false);
            });
        } else {
            setSubmodules([]);
        }
    }, [fieldData.module]);

    useEffect(() => {
        axios.get('http://localhost:8080/getFields')
            .then(response => {
                const fieldOptions = Object.entries(response.data).map(([name, value]) => ({
                    name: name,
                    value: value
                }));

                setFields(fieldOptions);
                setLoadingFields(false);
            })
            .catch(error => {
                console.error("Error fetching fields", error);
                setLoadingFields(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFieldData({
            ...fieldData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/createFields', fieldData, {
            withCredentials: true
        })
        .then(response => {
            // Handle response
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    };

    return (
        <Template>
            <div className="min-h-screen flex flex-col bg-gray-900 items-center">
                <form onSubmit={handleSubmit} className="p-4 space-y-4 w-full max-w-lg">
                    <div className="flex flex-col">
                        <label htmlFor="srNo" className="text-gray-300">Sr. No.</label>
                        <input
                            type="text"
                            id="srNo"
                            name="srNo"
                            value={fieldData.srNo}
                            onChange={handleChange}
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="module" className="text-gray-300">Module</label>
                        <div className="flex space-x-4 w-full">
                            {loadingModules ? (
                                <Loading />
                            ) : (
                                <select
                                    id="module"
                                    name="module"
                                    value={fieldData.module}
                                    onChange={handleChange}
                                    className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-1/2"
                                >
                                    <option value="">Select Module</option>
                                    {modules.map((module, index) => (
                                        <option key={index} value={module}>{module}</option>
                                    ))}
                                </select>
                            )}
                            {loadingSubmodules ? (
                                <Loading />
                            ) : (
                                <select
                                    id="submodule"
                                    name="formName"
                                    value={fieldData.formName}
                                    onChange={handleChange}
                                    className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-1/2"
                                    disabled={!fieldData.module}
                                >
                                    <option value="">Select Form-Name</option>
                                    {submodules.map((submodule, index) => (
                                        <option key={index} value={submodule}>{submodule}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fieldName" className="text-gray-300">Field Name</label>
                        <input
                            type="text"
                            id="fieldName"
                            name="fieldName"
                            value={fieldData.fieldName}
                            onChange={handleChange}
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fieldType" className="text-gray-300">Field Type</label>
                        {loadingFields ? (
                            <Loading />
                        ) : (
                            <select
                                id="fieldType"
                                name="fieldType"
                                value={fieldData.fieldType}
                                onChange={handleChange}
                                className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-full"
                            >
                                <option value="">Select Field Type</option>
                                {fields.length > 0 ? (
                                    fields.flatMap(field => 
                                        Object.keys(field.value).map(subFieldName => (
                                            <option key={subFieldName} value={subFieldName}>{subFieldName}</option>
                                        ))
                                    )
                                ) : (
                                    <option value="">No fields available</option>
                                )}
                            </select>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="required" className="text-gray-300">Required</label>
                        <select
                            id="required"
                            name="required"
                            value={fieldData.required}
                            onChange={handleChange}
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-full"
                        >
                            <option value="">Select Required</option>
                            <option value="true">TRUE</option>
                            <option value="false">FALSE</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="editable" className="text-gray-300">Editable</label>
                        <select
                            id="editable"
                            name="editable"
                            value={fieldData.editable}
                            onChange={handleChange}
                            className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-full"
                        >
                            <option value="">Select Editable</option>
                            <option value="true">TRUE</option>
                            <option value="false">FALSE</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Submit</button>
                </form>
            </div>
        </Template>
    );
}

export default CreateFields;
