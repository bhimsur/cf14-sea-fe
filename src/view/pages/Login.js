import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthService from "../../service/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const Login = () => {
	let navigate = useNavigate();
	const form = useRef();
	const checkBtn = useRef();
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const onChangeUserId = (e) => {
		const userId = e.target.value;
		setUserId(userId);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	}

	const handleLogin = (e) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);
		form.current.validateAll();
		if (checkBtn.current.context._errors.length === 0) {
			AuthService.login(
				{
					userId: userId,
					password: password
				})
				.then(response => response.json())
				.then(response => window.localStorage.setItem("token", response.headers.get("Access-Token")))
				.then(
				() => {
					navigate("/");
					window.location.reload();
				},
				(error) => {
					const resMessage = (error.response && error.response.data && error.response.data.message) ||
						error.message || error.toString();
					setLoading(false);
					setMessage(resMessage);
				}
			);
		} else {
			setLoading(false);
		}
	};

	return (
		<div className="col-md-12">
			<div className="card card-container">
				<Form onSubmit={handleLogin} ref={form}>
					<div className="form-group">
						<label htmlFor="userId">UserId</label>
						<Input
							type="text"
							className="form-control"
							name="userId"
							value={userId}
							onChange={onChangeUserId}
							validations={[required]}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<Input
							type="text"
							className="form-control"
							name="password"
							value={password}
							onChange={onChangePassword}
							validations={[required]}
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-primary btn-block" disabled={loading}>
							{loading && (
								<span className="spinner-border spinner-border-sm"></span>
							)}
							<span>Login</span>
						</button>
					</div>
					{message && (
						<div className="form-group">
							<div className="alert alert-danger" role="alert">
								{message}
							</div>
						</div>
					)}
					<CheckButton style={{display: "none"}} ref={checkBtn}/>
				</Form>
			</div>
		</div>
	);
};

export default Login;
