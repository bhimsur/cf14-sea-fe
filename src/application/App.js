import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../service/auth.service";
import {Link, Route, Routes} from "react-router-dom";
import Home from "../view/pages/Home";

// function App() {
// 	return (
// 		<h1>App</h1>
// 	);
// }

const App = () => {
	const logout = () => {
		AuthService.logout();
	};
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<Link to={"/"} className="navbar-brand">
					Canteen
				</Link>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/catalog"} className="navbar-brand">
							Catalog
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/history"} className="navbar-brand">
							History
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/wallet"} className="navbar-brand">
							History
						</Link>
					</li>
				</div>
			</nav>
			<div className="container mt-3">
				<Routes>
					<Route path="/" element={<Home/>}/>
				</Routes>
			</div>
		</div>
	)
}
export default App;