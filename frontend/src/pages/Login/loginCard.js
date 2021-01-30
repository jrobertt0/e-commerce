import { ReactComponent as Logo } from "../../assets/img/Logo.svg";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useState } from "react";
import "./loginCard.scss";
import { Link } from "react-router-dom";

async function preformLogin(credentials) {
	return fetch("http://localhost:5000/api/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
}

async function preformRegister(credentials) {
	return fetch("http://localhost:5000/api/user/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then(data => data.json());
}

function LoginCard({ login }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (login) {
			const token = await preformLogin({
				email,
				password,
			});
			console.log(token);
		} else {
			const token = await preformRegister({
				email,
				password,
				username
			});
			console.log(token);
		}
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
							type="email"
							className="input-login"
							placeholder="Correo"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-component">
						<FaLock className="icon"></FaLock>
						<input
							type="password"
							className="input-login"
							placeholder="Contraseña"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{login ? (
						<>
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
						</>
					)}
				</form>
			</div>
		</div>
	);
}

export default LoginCard;
