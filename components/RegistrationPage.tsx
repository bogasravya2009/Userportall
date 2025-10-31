import React, { useState } from 'react';
import type { User } from '../types';

interface RegistrationPageProps {
  onNavigateToLogin: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    email: '',
    mobileNumber: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if(Object.values(formData).some(value => value === '')) {
      setError('All fields are required.');
      return;
    }

    const usersJson = localStorage.getItem('users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    if (users.some(user => user.username === formData.username)) {
      setError('Username already exists.');
      return;
    }
     if (users.some(user => user.email === formData.email)) {
      setError('Email already registered.');
      return;
    }

    const newUser: User = {
      id: new Date().toISOString(),
      name: formData.name,
      username: formData.username,
      password: formData.password,
      gender: formData.gender,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => {
      onNavigateToLogin();
    }, 2000);
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Create an account
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
        <select name="gender" onChange={handleChange} value={formData.gender} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
        <input type="tel" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
        
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <button type="submit" className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Create account
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <button type="button" onClick={onNavigateToLogin} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
