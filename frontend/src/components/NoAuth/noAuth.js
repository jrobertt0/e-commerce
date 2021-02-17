import "./noAuth.scss";
import { ReactComponent as Warning } from "../../assets/img/warning.svg";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function NoAuth() {
	const [timeRedirect, setTimeRedirect] = useState(10);
	const history = useHistory();

	useEffect(() => {
		setInterval(() => setTimeRedirect((prev) => (prev -= 1)), 1000);
	}, []);

	useEffect(() => {
		if (timeRedirect <= 0) {
			history.push("/");
		}
	}, [timeRedirect]);

	return (
		<div className="warning-container">
			<h1><span className="highlight">¡Ups!</span> Parece que no iniciaste sesión</h1>
			<Warning></Warning>
			<h2>Serás redireccionado al inicio en: <span className="highlight">{timeRedirect}</span></h2>
			<button className="btn primary-gradient" onClick={() => history.push("/")}>
				<span> Ir a Inicio</span>
			</button>
		</div>
	);
}

export default NoAuth;
