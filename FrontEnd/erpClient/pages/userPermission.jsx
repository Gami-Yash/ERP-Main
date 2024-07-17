import React, { useEffect, useState } from "react";
import Template from "../src/components/template";
import axios from "axios";
import Loading from "../src/components/loading";

const DynamicForm = () => {
    const [formSchema, setFormSchema] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pathName = window.location.pathname.split('/').pop();
        axios.get(`http://localhost:8080/createForms?formName=${pathName}`)
            .then(response => {
                setFormSchema(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching form fields', error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };
    const renderForm = () => {
        if (loading) {
            return (
                <div >
                    <Loading />
                </div>
            );
        }

        if (!formSchema || formSchema.length === 0) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold text-white">No fields available</h1>
                </div>
            );
        }

        return (
            <div className="min-h-screen flex flex-col bg-gray-900 items-center">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
                    <div className="flex flex-col">
                        {formSchema.map((field, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="text-gray-300">
                                    {field.fieldname}
                                </label>
                                {field.fieldtype === "textarea" ? (
                                    <textarea
                                        name={field.fieldname}
                                        required={field.required}
                                        readOnly={!field.editable}
                                        className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-full"
                                    />
                                ) : (
                                    <input
                                        type={field.fieldtype}
                                        name={field.fieldname}
                                        required={field.required}
                                        readOnly={!field.editable}
                                        className="px-4 py-2 border border-white rounded focus:outline-none focus:border-blue-500 bg-gray-900 text-white w-full"
                                    />
                                )}
                            </div>
                        ))}
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    };


    return <Template>{renderForm()}</Template>;
};

export default DynamicForm;
