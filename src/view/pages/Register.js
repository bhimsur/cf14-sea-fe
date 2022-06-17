import React, {useRef, useState} from "react";
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

const vUserId = (value) => {
	if (value.length < 5 || value.length > 5) {
		return (
			<div className="alert alert-danger" role="alert">
				The userId must consist 5 characters.
			</div>
		);
	}
};

const Register = () => {
	const form = useRef();
	const checkBtn = useRef();
	const [userId, setUserId] = useState("");
	const [nameAlias, setNameAlias] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");
	const onChangeUserId = (e) => {
		const userId = e.target.value;
		setUserId(userId);
	};
	const onChangeNameAlias = (e) => {
		const nameAlias = e.target.value;
		setNameAlias(nameAlias);
	};
	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleRegister = (e) => {
		e.preventDefault();
		setMessage("");
		setSuccess(false);
		form.current.validateAll();
		if (checkBtn.current.context._errors.length === 0) {
			AuthService.register({
				userId: userId,
				nameAlias: nameAlias,
				password: password
			}).then(
				(response) => {
					setMessage(response.data.success);
					setSuccess(true);
				},
				(error) => {
					const resMessage = (error.response && error.response.data) || error.message || error.toString();
					setMessage(resMessage);
					setSuccess(false);
				}
			);
		}
	};

	return (
		<div className="col-md-12">
			<div className="card card-container">
				<Form onSubmit={handleRegister} ref={form}>
					{!success && (
						<div>
							<div className="form-group">
								<label htmlFor="userId">UserId</label>
								<Input
									type="text"
									className="form-control"
									name="userId"
									value={userId}
									onChange={onChangeUserId}
									validations={[required, vUserId]}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="nameAlias">Name</label>
								<Input
									type="text"
									className="form-control"
									name="nameAlias"
									value={nameAlias}
									onChange={onChangeNameAlias}
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
								<button className="btn btn-primary btn-block">Register</button>
							</div>
						</div>
					)}
					{message && (
						<div className="form-group">
							<div className={success ? "alert alert-success" : "alert alert-danger"} role="alert">
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

export default Register;