import React from 'react';
import type { User } from '../types';

interface HomePageProps {
  user: User;
  onLogout: () => void;
}

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className="text-sm text-gray-900 dark:text-white">{value}</dd>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-lg p-6 sm:p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome, {user.name}!
        </h1>
        <button
          onClick={onLogout}
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Logout
        </button>
      </div>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-200 dark:divide-gray-700">
            <DetailRow label="Username" value={user.username} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Mobile Number" value={user.mobileNumber} />
            <DetailRow label="Gender" value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)} />
        </dl>
      </div>
    </div>
  );
};

export default HomePage;
