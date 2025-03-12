import Cookies from "js-cookie";

export async function removeOcurrence(id: string) {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch(`http://localhost:3001/api/v1/ocurrences/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if(!response.ok) {
        return null;
    }

    return await response.json();
}