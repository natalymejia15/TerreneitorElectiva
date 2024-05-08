import React, { useState } from 'react';
import logo from "../../image/logo.png";


export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img
                    src={logo}
                    alt="Placeholder Image"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-600">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-600">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="bg-violet-900 hover:bg-violet-700 text-white font-semibold rounded-md py-2 px-4 w-full"
                >
                    Register
                </button>
                <div className="mt-6 text-violet-500 text-center">
                    <a href="/" className="hover:underline">
                        Go back
                    </a>
                </div>

            </div>
        </div>
    );
};
