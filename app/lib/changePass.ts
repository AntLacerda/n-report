import Cookies from "js-cookie";

interface ChangePassData {
    currentPassword: string;
    newPassword: string;
}

export async function changePass(data: ChangePassData) {
     const token = Cookies.get("token");

     if(!token) {
          return null;
     }


     const response = await fetch("http://localhost:3001/auth/change-password", {
          method: "PUT",
          headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
    })

     if(!response.ok) {
          return null;
     }

     return await response.json();
}

export async function checkPasswordMatch(password: string, repeatPassword: string) {
     if(password !== repeatPassword) {
          return new Error("Passwords do not match");
     }

     return true;
}