import Cookies from "js-cookie";

interface Ocurrence {
    id: string;
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

export async function getOcurrences(): Promise<Ocurrence[] | null> {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }  

    const response = await fetch("http://localhost:3001/api/v1/ocurrences/", {
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

export async function getOcurrenceById(id: string): Promise<Ocurrence | undefined> {
    const token = Cookies.get("token");

    if(!token) {
        return undefined;
    }

    const response = await fetch(`http://localhost:3001/api/v1/ocurrences/${id}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if(!response.ok) {
        return undefined;
    }

    return await response.json();
}