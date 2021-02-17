import { getToken } from "../helpers/storage";

const direction = "http://localhost:5000/api";

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

export async function getCurrentUser(setValue) {
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
	const { Error } = remoteUser;
	return Error
}

export async function editUser(credentials) {
	const token = getToken();
	let response = await fetch(direction + "/account/user/edit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(credentials),
	});
	response = await response.json();
	return response;
}

export async function uploadImage(file, type) {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
	let response = await fetch(direction + "/upload/" + type, {
		method: "POST",
		headers: {
			"auth-token": token,
		},
		body: formData,
	});
    response = await response.json();
    return response;
}

export async function deleteImage(id, type) {
    const token = getToken();
	let response = await fetch(direction + "/upload/" + type + "/delete/" + id, {
		method: "DELETE",
		headers: {
			"auth-token": token,
		},
	});
    response = await response.json();
    return response;
}
