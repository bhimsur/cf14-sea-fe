import React, {useEffect, useRef, useState} from "react";
import WalletService from "../../service/wallet.service";
import {Alert, Card, Col, Container, FormGroup, FormLabel, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import currencyFormatter from "../../service/helper/currency";

const Wallet = () => {
	const form = useRef();
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
			.then(response => setWallet(currencyFormatter.format(response.data.amount)))
			.catch(e => console.log(e));
	};

	const handleTopUp = (e) => {
		const data = {
			transactionType: "TOP_UP",
			amount: amount
		};
		handleTransaction(e, data);
	};

	const handleWithdraw = (e) => {
		const data = {
			transactionType: "WITHDRAW",
			amount: amount
		};
		handleTransaction(e, data);
	};

	const handleTransaction = (e, data) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);
		WalletService.balanceTransaction(data)
			.then(response => {
				console.log(response.data);
				if (data.transactionType === "TOP_UP") {
					setWallet(Number(wallet) + Number(data.amount));
				} else {
					setWallet(Number(wallet) - Number(data.amount));
				}
				if (response.data.success) {
					setLoading(false);
					setAmount("");
				}
			}, error => {
				const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
				setLoading(false);
				setMessage(resMessage);
			})
			.catch(e => console.log(e));
	};

	const amountTemplate = [10000, 25000, 50000, 100000];

	return (
		<Container>
			<Card border="light">
				<Card.Text style={{marginRight: 0, marginLeft: "auto"}}>
					{wallet}
				</Card.Text>
			</Card>

			{/*<Form onSubmit={handleTransaction} ref={form}>*/}
			<Form ref={form}>
				<Row>
					{amountTemplate.map((value, index) => (
						<Col sm={2} md={2} lg={3} key={index}>
							<div className="d-grid gap-2">
								<FormGroup>
									<Button
										size="md"
										variant="primary"
										onClick={onChangeAmount}
										value={value}
									>
										{currencyFormatter.format(value)}
									</Button>
								</FormGroup>
							</div>
						</Col>
					))}

				</Row>
				<FormGroup>
					<div className="my-4">
						<FormLabel>Nominal (Rp.)</FormLabel>
						<Input
							type="text"
							className="form-control col-lg-2"
							name="amount"
							value={amount}
							onChange={onChangeAmount}
						/>
					</div>

				</FormGroup>
				<Button
					style={{justifyContent: "space-around", display: "inline-block", marginRight: "1rem"}}
					disabled={loading}
					// type="submit"
					onClick={handleTopUp}
				>
					Top Up
				</Button>
				<Button
					style={{justifyContent: "space-around", display: "inline-block"}}
					disabled={loading}
					// type="submit"
					onClick={handleWithdraw}
				>
					Withdraw
				</Button>
				{message && (
					<FormGroup>
						<Alert>{message}</Alert>
					</FormGroup>
				)}
			</Form>
		</Container>
	);
};

export default Wallet;