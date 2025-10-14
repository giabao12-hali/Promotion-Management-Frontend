'use client'

import { AuthService } from "@/services/auth/auth.service";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useIsClient } from "@/hooks/use-local-storage";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    fullName: string | null;
    email: string | null;
    login: (token: string, fullName: string, email: string) => void;
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
    const [fullName, setFullName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isClient = useIsClient();

    useEffect(() => {
        if (isClient) {
            const userInfo = AuthService.getUserInfo();
            setToken(userInfo.token);
            setFullName(userInfo.fullName);
            setEmail(userInfo.email);
        }
        setIsLoading(false);
    }, [isClient])

    const login = (newToken: string, newFullName: string, newEmail: string) => {
        AuthService.setToken(newToken, newFullName, newEmail);
        setToken(newToken);
        setFullName(newFullName);
        setEmail(newEmail);
    };

    const logout = () => {
        AuthService.logout();
        setToken(null);
        setFullName(null);
        setEmail(null);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!token,
            token,
            fullName,
            email,
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