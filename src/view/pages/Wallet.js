import React, {useEffect, useRef, useState} from "react";
import WalletService from "../../service/wallet.service";
import {useNavigate} from "react-router-dom";
import {Alert, Card, Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import WalletCard from "../components/Wallet.Card";
import Button from "react-bootstrap/Button";
import CheckButton from "react-validation/build/button";

const Wallet = () => {
	let navigate = useNavigate();
	const form = useRef();
	const checkBtn = useRef();
	const [wallet, setWallet] = useState(0);
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getBalance()
	}, []);
	const onChangeAmount = (e) => {
		const amount = e.target.value;
		console.log(amount);
		setAmount(amount);
	};

	const getBalance = () => {
		WalletService.getBalance()
			.then(response => setWallet(response.data.amount))
			.catch(e => console.log(e));
	}

	const handleTransaction = (e) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);
		form.current.validateAll();
		if (checkBtn.current.context._errors.length === 0) {
			const data = {
				amount: amount,
				transactionType: "TOP_UP"
			};
			WalletService.balanceTransaction(data)
				.then(response => console.log(response.data))
				.then((error) => {
					const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
					setLoading(false);
					setMessage(resMessage);
				})
				.catch(e => console.log(e));
		} else {
			setLoading(false);
		}
	};

	const amountTemplate = [10000, 25000, 50000, 100000];

	return (
		<Container>
			<WalletCard
				amount={wallet}
			/>
			<Form onSubmit={handleTransaction} ref={form}>
				<Row>
					{amountTemplate.map((value, index) => (
						<Col sm={2} md={2} lg={3} key={index}>
							<Card>
								<div className="d-grid gap-2">
									<FormGroup>
										<Button
											size="md"
											variant="primary"
											onClick={onChangeAmount}
											value={value}
										>
											Rp. {value}
										</Button>
									</FormGroup>
								</div>
							</Card>
						</Col>
					))}
				</Row>
				<FormGroup>
					<Button
						style={{justifyContent: "space-around", display: "inline-block"}}
						disabled={loading}
						// type="submit"
					>
						Top Up
					</Button>
				</FormGroup>
				<FormGroup>
					{message && (
						<FormGroup>
							<Alert>{message}</Alert>
						</FormGroup>
					)}
				</FormGroup>
				<CheckButton style={{disabled: "none"}} ref={checkBtn}/>
			</Form>
		</Container>
	);
};

export default Wallet;