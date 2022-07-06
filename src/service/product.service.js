import http from "./helper/http-common";
import authHeader from "./helper/auth-header";

const getAll = () => {
	return http.get("/product");
};

const add = (data, onUploadProgress) => {
	return http.post("/product/add", data, {headers: authHeader()}, onUploadProgress);
};

const buy = (data) => {
	return http.post("/product/buy", data, {headers: authHeader()});
};

const get = (data) => {
	return http.post("/product", data, {headers: authHeader()});
}

const ProductService = {
	getAll,
	add,
	buy,
	get
};

export default ProductService;