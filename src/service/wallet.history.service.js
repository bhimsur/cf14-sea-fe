import http from "./helper/http-common";
import authHeader from "./helper/auth-header";

const headers = {
	headers: authHeader()
};
const getWalletHistory = () => {
	return http.get("/wallet/history", headers);
}

const getWalletHistorySummary = (data) => {
	return http.post("/wallet/history/summary", data, headers);
}

const WalletHistoryService = {
	getWalletHistorySummary,
	getWalletHistory
};

export default WalletHistoryService;