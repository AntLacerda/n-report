"use client";

import z from "zod";
import Cookies from "js-cookie";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginData = z.infer<typeof loginSchema>;

export async function login(data: LoginData) {
    const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include",
    })

    if(!response.ok) {
        throw new Error("Login Failed");
    }

    const { userId, token } = await response.json();

    Cookies.set("token", token, { expires: 7, secure: true });

    return { userId, token };
}

export async function logout() {
    Cookies.remove("token");
    window.location.href = "/login";
}

export async function getCurrentUser() {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch("http://localhost:3001/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include", 
    });

    if(!response.ok) {
        logout();
        return null;
    }

    return await response.json();
}