import Cookies from "js-cookie";

interface ChangeLoginData {
    email: string;
    newEmail: string;
}

export async function changeLogin(data: ChangeLoginData) {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch("http://localhost:3001/auth/change-email", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        return null;
    }

    return await response.json();
}

export async function checkEmailMatch(email: string, repeatEmail: string) {
    if(email !== repeatEmail) {
        return new Error("Emails do not match");
    }

    return true;
}