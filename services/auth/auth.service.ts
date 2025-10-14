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
        try {
            console.log('Login request payload:', payload);
            const res = await api.post("/api/Auth/login", payload);
            console.log('Login response data:', res.data);
            
            // Kiểm tra xem API có trả về đủ thông tin không
            if (!res.data.token) {
                throw new Error('Token không được trả về từ API');
            }
            
            return res.data;
        } catch (error: unknown) {
            console.error('Login error details:', error);
            throw error;
        }
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('fullName');
            localStorage.removeItem('email');
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    },

    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    },

    setToken: (token: string, fullName: string, email: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('email', email);
            const expires = new Date();
            expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
            // Trong development, không sử dụng secure flag
            const isProduction = window.location.protocol === 'https:';
            const secureFlag = isProduction ? '; secure' : '';
            document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; samesite=strict${secureFlag}`;
        }
    },

    getFullName: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('fullName');
        }
        return null;
    },

    getEmail: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('email');
        }
        return null;
    },

    getUserInfo: () => {
        // Always return null on server-side to prevent hydration mismatch
        if (typeof window === 'undefined') {
            return {
                token: null,
                fullName: null,
                email: null,
            };
        }
        
        try {
            return {
                token: localStorage.getItem('token'),
                fullName: localStorage.getItem('fullName'),
                email: localStorage.getItem('email'),
            };
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return {
                token: null,
                fullName: null,
                email: null,
            };
        }
    }
}