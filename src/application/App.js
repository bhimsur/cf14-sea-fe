import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../service/auth.service";
import {Link, Route, Routes} from "react-router-dom";
import Login from "../view/pages/Login";
import Register from "../view/pages/Register";
import Home from "../view/pages/Home";
import WalletHistory from "../view/pages/WalletHistory";
import Wallet from "../view/pages/Wallet";
import WalletService from "../service/wallet.service";
import currencyFormatter from "../service/helper/currency";
import Product from "../view/pages/Product";

const App = () => {
	const [currentUser, setCurrentUser] = useState("");
	const [wallet, setWallet] = useState(0);
	useEffect(() => {
		const user = AuthService.getUserId();
		if (user) {
			setCurrentUser(user);
		}
		getBalance();
	}, []);
	const logout = () => {
		AuthService.logout();
	};

	const getBalance = () => {
		WalletService.getBalance()
			.then(response => setWallet(currencyFormatter.format(response.data.amount)))
			.catch(e => console.log(e));
	};


	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<Link to={"/"} className="navbar-brand">
					Canteen
				</Link>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/history"} className="nav-link">
							History
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/wallet"} className="nav-link">
							Wallet
						</Link>
					</li>
				</div>
				{
					currentUser ? (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={""} className={"nav-link"}>
									{wallet}
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/profile"} className="nav-link">
									{currentUser}
								</Link>
							</li>
							<li className="nav-item">
								<a href="/login" className="nav-link" onClick={logout}>
									Logout
								</a>
							</li>
						</div>
					) : (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={"/login"} className="nav-link">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/register"} className="nav-link">
									Register
								</Link>
							</li>
						</div>
					)}
			</nav>
			<div className="container mt-3">
				<Routes>
					<Route path="/login" element={<Login/>}/>
					<Route path="/register" element={<Register/>}/>
					<Route path="/" element={<Home onUpdate={getBalance}/>}/>
					<Route path="/history" element={<WalletHistory/>}/>
					<Route path="/wallet" element={<Wallet onUpdate={getBalance}/>}/>
					<Route path="/product" element={<Product/>}/>
				</Routes>
			</div>
		</div>
	)
}
export default App;