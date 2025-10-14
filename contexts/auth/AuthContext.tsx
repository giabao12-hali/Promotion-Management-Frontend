'use client'

import { AuthService } from "@/services/auth/auth.service";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(
    {
        children
    }: {
        children: ReactNode
    }
) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = AuthService.getToken();
        setToken(storedToken);
        setIsLoading(false);
    }, [])

    const login = (newToken: string) => {
        AuthService.setToken(newToken);
        setToken(newToken);
    };

    const logout = () => {
        AuthService.logout();
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!token,
            token,
            login,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context;
}