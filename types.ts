export interface User {
  id: string;
  name: string;
  username: string;
  password: string; // In a real app, this should be a hash
  gender: string;
  email: string;
  mobileNumber: string;
}

export type Page = 'login' | 'register' | 'home';
