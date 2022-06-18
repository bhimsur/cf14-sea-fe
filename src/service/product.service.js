import http from "./helper/http-common";
import authHeader from "./helper/auth-header";

const getAll = () => {
	return http.get("/product");
};

const add = (data) => {
	return http.post("/product/add", data, authHeader);
};

const buy = (data) => {
	return http.post("/product/buy", data, authHeader);
};

const get = (data) => {
	return http.post("/product", data, authHeader);
}

const ProductService = {
	getAll,
	add,
	buy,
	get
};

export default ProductService;