"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: number;
  github_username: string;
  email: string;
  role: string;
  profile_picture?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      const savedUser = localStorage.getItem("code4change_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setLoading(false);
      }

      try {
        const response = await fetch("http://localhost:3001/api/auth/user", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("code4change_user", JSON.stringify(data.user));
          setUser(data.user);
        } else {
          localStorage.removeItem("code4change_user");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        credentials: "include",
      });
      localStorage.removeItem("code4change_user");
      setUser(null);
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
