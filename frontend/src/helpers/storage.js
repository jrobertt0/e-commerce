export function setToken(userToken) {
	sessionStorage.setItem("token", JSON.stringify(userToken));
}

export function getToken() {
	const tokenString = sessionStorage.getItem("token");
	return JSON.parse(tokenString);
}

export function setInLocal(name, item) {
	localStorage.setItem(name, item);
}

export function getInLocal(name, json = false) {
    const item = localStorage.getItem(name);
	return json ? JSON.parse(item) : item;
}

export function localClear() {
    localStorage.clear()
}

export function setInSession(name, item) {
	sessionStorage.setItem(name, item);
}

export function getInSession(name, json = false) {
    const item = sessionStorage.getItem(name);
	return json ? JSON.parse(item) : item;
}

export function sessionClear() {
    sessionStorage.clear();
}

export function clearAll(){
    localStorage.clear();
    sessionStorage.clear();
}