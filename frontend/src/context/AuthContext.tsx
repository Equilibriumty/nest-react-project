import React, { useContext, useMemo, useState } from 'react';
import { Student, Teacher } from '../types/types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setUser: (data: Student | Teacher) => void;
  user: Student | Teacher;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setUser: () => {},
  user: {
    email: '',
    password: '',
    username: '',
    courses: [],
    role: 'TEACHER',
    createdAt: '',
    id: '',
    updatedAt: '',
    token: '',
  },
});

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<Student | Teacher>({
    email: '',
    password: '',
    username: '',
    courses: [],
    role: 'TEACHER',
    createdAt: '',
    id: '',
    updatedAt: '',
    token: '',
  });

  // TODO: FIX CONTEXT PROBLEM WITH USER DATA
  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      user: userData,
      login: () => setIsAuthenticated(true),
      logout: () => {
        setIsAuthenticated(false);
        setUserData({} as Teacher | Student);
      },
      setUser: (data: Student | Teacher) => setUserData(data),
    };
  }, [isAuthenticated, userData]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
