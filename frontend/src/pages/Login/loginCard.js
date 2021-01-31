import { ReactComponent as Logo } from "../../assets/img/Logo.svg";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
	setToken,
	setInLocal,
	localClear,
	getInLocal,
} from "../../helpers/storage";
import "./loginCard.scss";
import { Link } from "react-router-dom";

async function preformLogin(credentials) {
	return fetch("http://localhost:5000/api/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

async function preformRegister(credentials) {
	return fetch("http://localhost:5000/api/user/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

function LoginCard({ login }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [msgs, setMsgs] = useState("");
	const [rememberMe, setRememberme] = useState(false);

	useEffect(() => {
		if (getInLocal("rememberMe")) {
			setRememberme(true);
			setEmail(getInLocal("email"));
			setPassword(getInLocal("password"));
		}
	}, []);

	const handleSubmit = async (e) => {
		let res;
		e.preventDefault();
		if (login) {
			res = await preformLogin({
				email,
				password,
			});
		} else {
			res = await preformRegister({
				email,
				password,
				username,
			});
		}
		if (res.Error) {
			setMsgs(res.Error);
			setTimeout(() => setMsgs(""), 2000);
		} else if (res.token) {
			console.log("here")
			setToken(res.token);
			if (rememberMe) {
				setInLocal("rememberMe", true);
				setInLocal("email", email);
				setInLocal("password", password);
			} else {
				localClear();
			}
			setEmail("");
			setPassword("");
			setUsername("");
			window.location.href = "/";
		}
		console.log(res);
	};

	return (
		<div className="card-container">
			<h2>{login ? "Iniciar Sesión" : "Registro"}</h2>
			<div className="card">
				<Logo></Logo>
				<form className="login-form" onSubmit={(e) => handleSubmit(e)}>
					{!login ? (
						<div className="input-component">
							<FaUserAlt className="icon"></FaUserAlt>
							<input
								required
								type="text"
								className="input-login"
								placeholder="Usuario"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					) : (
						<></>
					)}
					<div className="input-component">
						<HiMail className="icon"></HiMail>
						<input
							value={email}
							required
							type="email"
							className="input-login"
							placeholder="Correo"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-component">
						<FaLock className="icon"></FaLock>
						<input
							value={password}
							required
							autoComplete="false"
							type="password"
							className="input-login"
							placeholder="Contraseña"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{login ? (
						<>
							<div className="login">
								<input
									type="checkbox"
									id="check"
									name="check"
									checked={rememberMe}
									onChange={() => setRememberme(!rememberMe)}
								/>
								<label htmlFor="check">
									<span></span>Recuerdame
								</label>
							</div>
							<button type="submit" className="btn login-button">
								<span>Ingresar</span>
							</button>
							<Link
								to="/register"
								className="btn-outline login-button"
							>
								<span>Registrarse</span>
							</Link>
						</>
					) : (
						<>
							<button type="submit" className="btn login-button">
								<span>Registrarse</span>
							</button>
							<Link to="/login" className="login-link">
								Iniciar Sesión
							</Link>
						</>
					)}
					<div
						className={
							msgs === "" ? "error-msgs" : "error-msgs active"
						}
					>
						<h5>{msgs}</h5>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginCard;
