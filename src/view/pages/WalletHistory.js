import React, {useEffect, useState} from "react";
import WalletHistoryCard from "../components/Wallet.History.Card";
import WalletHistoryService from "../../service/wallet.history.service";
import {Row} from "react-bootstrap";

const WalletHistory = () => {
	const [walletHistory, setWalletHistory] = useState([]);
	useEffect(() => {
		getWalletHistory();
	}, []);
	const getWalletHistory = () => {
		WalletHistoryService.getWalletHistory()
			.then(response => setWalletHistory(response.data.result))
			.catch(e => console.log(e));
	}
	return (
		<Row xs={1} md={1} lg={1}>
			{walletHistory && walletHistory.map((data, index) => (
				<WalletHistoryCard
					key={data.id}
					index={index}
					id={data.id}
					amount={data.amount}
					timestamp={data.timestamp}
					type={data.transactionType}
				/>
			))}
		</Row>
	)
};

export default WalletHistory;