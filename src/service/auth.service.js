import http from "./helper/http-common";

const register = data => {
	return http.post("/user/registration", data);
};

const login = data => {
	return http.post("/user/login", data);
};

const logout = () => {
	localStorage.clear();
};

const getUserId = () => {
	return localStorage.getItem("nameAlias");
};

const AuthService = {
	register,
	login,
	logout,
	getUserId
};

export default AuthService;