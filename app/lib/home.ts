import Cookies from "js-cookie";

export async function ocurrenceCountSelf() {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }
   
    const response = await fetch("http://localhost:3001/api/v1/ocurrences/count/self", {
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

export async function ocurrenceCountAll() {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch("http://localhost:3001/api/v1/ocurrences/count/all", {
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

export async function muderCount() {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch("http://localhost:3001/api/v1/ocurrences/count/murders", {
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

export async function theftCount() {
    const token = Cookies.get("token");

    if(!token) {
        return null;
    }

    const response = await fetch("http://localhost:3001/api/v1/ocurrences/count/thefts", {
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