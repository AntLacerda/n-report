import Cookies from "js-cookie";

interface Ocurrence {
    title: string;
    description: string;
    type: string;
    latitude: number;
    longitude: number;
    date: string;
    time: string;
    user_id: string;
    policeStation_id: string;
}

export async function getPoliceStations() {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch("http://localhost:3001/api/v1/policeStation/", {
        method: "GET",
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

export async function createOcurrence(data: Ocurrence) {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch("http://localhost:3001/api/v1/ocurrences/save", {
        method: "POST",
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