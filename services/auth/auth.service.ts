import api from "@/lib/axiosConfig";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: number;
}

export const AuthService = {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const res = await api.post("/api/Auth/login", payload);
        return res.data;
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    },

    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    },
    
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            const expires = new Date();
            expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
            // Trong development, không sử dụng secure flag
            const isProduction = window.location.protocol === 'https:';
            const secureFlag = isProduction ? '; secure' : '';
            document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; samesite=strict${secureFlag}`;
        }
    }
    // login: async (payload: LoginPayload) => {
    //     const res = await api.post("/api/Auth/login", payload);
    //     return res.data;
    // }
}