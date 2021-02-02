import { getToken } from "../helpers/storage";

const direction = "http://localhost:5000/api"

export async function loginRegister(credentials, type) {
    let uri = direction + "/user/" + type;
    return fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

export async function getUser(setValue) {
    const token = getToken();
    const response = await fetch(direction + "/account/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
    });
    const remoteUser = await response.json();
    setValue(remoteUser);
}

export async function editUser(credentials){
    const token = getToken();
    let response = await fetch(direction + "/account/user/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify(credentials)
    });
    response = await response.json();
    return response;
}