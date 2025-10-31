import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import HomePage from './components/HomePage';
import type { User, Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check session storage for a logged-in user
    const loggedInUserJson = sessionStorage.getItem('currentUser');
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson) as User;
      setCurrentUser(user);
      setCurrentPage('home');
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('home');
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    sessionStorage.removeItem('currentUser');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigateTo('register')} />;
      case 'register':
        return <RegistrationPage onNavigateToLogin={() => navigateTo('login')} />;
      case 'home':
        return currentUser ? <HomePage user={currentUser} onLogout={handleLogout} /> : <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigateTo('register')} />;
      default:
        return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigateTo('register')} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      {renderPage()}
    </div>
  );
}

export default App;
