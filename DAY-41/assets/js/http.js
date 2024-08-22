import { config } from "./config.js";
const { SERVER_API } = config;

export const requestLogin = async (data) => {
    try {
        const response = await fetch(`${SERVER_API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Unauthenticated");
        }
        return response.json();
    } catch {
        return false;
    }
};

// export const requestRegister = async (data) => {
//     try {
//         const response = await fetch(`${SERVER_API}/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         return response.json();
//     } catch (error) {
//         console.error(
//             "There has been a problem with your fetch operation:",
//             error
//         );
//     }
// };
