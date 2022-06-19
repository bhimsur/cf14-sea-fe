import React, {useState} from "react";
import {Card} from "react-bootstrap";

const WalletHistoryCard = props => {
	const initialWalletHistoryState = {
		id: props.id,
		amount: props.amount,
		timestamp: props.timestamp,
		transactionType: props.type
	};

	const [walletHistory, setWalletHistory] = useState(initialWalletHistoryState);
	return (
		<Card style={{width: "18rem", margin: "auto", marginBottom: "1.2rem"}}>
			<Card.Body>
				<Card.Title>{walletHistory.transactionType}</Card.Title>
				<div className="d-flex justify-content-between">
					<Card.Text>{walletHistory.amount}</Card.Text>
					<Card.Text>{walletHistory.timestamp}</Card.Text>
				</div>
			</Card.Body>
		</Card>
	);
};

export default WalletHistoryCard;