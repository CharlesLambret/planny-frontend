import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getUserFromSession, Login, Logout, Register, updateUserById } from '@/api/auth/apicalls';

interface AuthContextProps {
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (nom: string, prenom: string, email: string, password: string) => Promise<void>;
  updateUser: (id: string, updatedUser: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const storedUser = getUserFromSession();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password must be provided');
    }
    const loggedUser = await Login(email, password);
    setUser(loggedUser);
  };

  const logout = () => {
    Logout();
    setUser(undefined);
  };

  const register = async (nom: string, prenom: string, email: string, password: string) => {
    if (!nom || !prenom || !email || !password) {
      throw new Error('All fields must be provided');
    }
    const createdUser = await Register(nom, prenom, email, password);
    setUser(createdUser);
  };

  const updateUser = async (id: string, updatedUser: Partial<User>) => {
    const userData = await updateUserById(id, updatedUser);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};