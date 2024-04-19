import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white-10 shadow-md w-full max-w-md p-8 bg-white shadow-md rounded-md " style={{ width: "1400px", marginRight: "800px" }}>
                <h2 className="text-2xl font-semibold mb-4 text-center">My details</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleEdit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-black-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-black-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-black-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-black-700 font-semibold mb-2">Biography</label>
                        <textarea
                            id="username"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></textarea>
                    </div>
                    <NavLink
                        to="/"
                        className="mr-2 bg-violet-900 hover:bg-gray-400 text-white rounded-md p-10 py-2 text-sm font-medium"
                        aria-current="page"
                    >
                        Close
                    </NavLink>
                    <button type="submit" className="bg-violet-900 hover:bg-gray-400 text-white rounded-md p-10 py-2 text-sm font-medium">Save</button>
                </form>
            </div>
        </div>
    );
};
