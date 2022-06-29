import axios from "axios";

let api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
});

api.interceptors.response.use((response) => response, (error) => {
	if (error.response.status === 401) {
		window.localStorage.clear();
	}
});

export default api;