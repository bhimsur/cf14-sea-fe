import http from "./helper/http-common";

const register = data => {
	return http.post("/register", data);
};

const login = data => {
	return http.post("/login", data);
};

const logout = () => {
	localStorage.removeItem("token");
};

const getUserId = () => {
	return JSON.parse(localStorage.getItem("token"));
};

const AuthService = {
	register,
	login,
	logout,
	getUserId
};

export default AuthService;