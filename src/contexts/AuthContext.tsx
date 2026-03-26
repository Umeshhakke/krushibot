import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (userId: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials for testing - 5 farmer accounts
const DEMO_CREDENTIALS = [
  { userId: 'farmer1', password: 'krishi001' },
  { userId: 'farmer2', password: 'krishi002' },
  { userId: 'farmer3', password: 'krishi003' },
  { userId: 'farmer4', password: 'krishi004' },
  { userId: 'farmer5', password: 'krishi005' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('krishibot_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        if (session.userId && session.expiresAt > Date.now()) {
          setIsAuthenticated(true);
          setUserId(session.userId);
        } else {
          localStorage.removeItem('krishibot_session');
        }
      } catch {
        localStorage.removeItem('krishibot_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (inputUserId: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validate credentials against all demo users
    const validUser = DEMO_CREDENTIALS.find(
      cred => cred.userId === inputUserId && cred.password === password
    );
    if (validUser) {
      const session = {
        userId: inputUserId,
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      };
      localStorage.setItem('krishibot_session', JSON.stringify(session));
      setIsAuthenticated(true);
      setUserId(inputUserId);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('krishibot_session');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
