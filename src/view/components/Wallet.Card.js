import React, {useState} from "react";
import {Card} from "react-bootstrap";

const WalletCard = props => {
	const initialWallet = {
		amount: props.amount
	};

	const [wallet, setWallet] = useState(initialWallet);

	return (
		<Card border="light">
			<Card.Text style={{marginRight: 0, marginLeft: "auto"}}>
				Rp. {wallet.amount}
			</Card.Text>
		</Card>
	);
};

export default WalletCard;