import React from 'react';

const AccessDeniedModal = () => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl max-w-sm w-full p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                    <p className="mt-4 text-gray-300">You don't have access to that page.</p>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessDeniedModal;
