import React, {useState} from "react";
import {Card} from "react-bootstrap";
import currencyFormatter from "../../service/helper/currency";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowTrendDown, faArrowTrendUp, faCartShopping, faMoneyBillTrendUp, faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons'

const WalletHistoryCard = props => {
	const initialWalletHistoryState = {
		id: props.id,
		amount: props.amount,
		timestamp: props.timestamp,
		transactionType: props.type
	};

	const getTransactionType = (transactionType) => {
		let tt;
		switch (transactionType) {
			case "TOP_UP":
				tt = (<div><FontAwesomeIcon icon={faArrowTrendUp}/> Top Up</div>);
				break;
			case "WITHDRAW":
				tt = (<div><FontAwesomeIcon icon={faArrowTrendDown}/> Withdraw</div>);
				break;
			case "BUY":
				tt = (<div><FontAwesomeIcon icon={faCartShopping}/> Buy</div>);
				break;
			case "BUY_OWN_ITEM":
				tt = (<div><FontAwesomeIcon icon={faMoneyCheckDollar}/> Buy Own Item</div>);
				break;
			default:
				tt = (<div><FontAwesomeIcon icon={faMoneyBillTrendUp}/> Sell</div>);
		}
		return (tt);
	}

	const [walletHistory, setWalletHistory] = useState(initialWalletHistoryState);
	return (
		<Card style={{width: "18rem", margin: "auto", marginBottom: "1.2rem"}}>
			<Card.Body>
				<Card.Title>{getTransactionType(walletHistory.transactionType)}</Card.Title>
				<div className="d-flex justify-content-between">
					<Card.Text>{currencyFormatter.format(walletHistory.amount)}</Card.Text>
					<Card.Text>{walletHistory.timestamp}</Card.Text>
				</div>
			</Card.Body>
		</Card>
	);
};

export default WalletHistoryCard;