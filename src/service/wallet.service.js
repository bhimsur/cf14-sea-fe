import authHeader from "./helper/auth-header";
import http from "./helper/http-common";

const headers = {
	headers: authHeader()
};

const getBalance = () => {
	return http.get("/wallet", headers);
};

const balanceTransaction = (data) => {
	return http.post("/wallet", data, headers);
};

const WalletService = {
	getBalance,
	balanceTransaction
};

export default WalletService;