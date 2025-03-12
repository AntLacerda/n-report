"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "../lib/auth";

type AuthContextType = {
    user: any;
    loading: boolean;
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function fetchUser() {
            const userData = await getCurrentUser();
            setUser(userData);
            setLoading(false);
        }

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}