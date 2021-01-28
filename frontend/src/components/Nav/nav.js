import "./nav.scss";
import Avatar from "../Avatar/avatar";

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";
import { useState } from "react";

function Nav() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<nav>
			<Logo></Logo>
			<ul className="nav-links">
				<li>
					<Link to="/shop">Shop</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
			{loggedIn ? (
				<div className="account-container">
					<Link>
						<Avatar></Avatar>
					</Link>
					<Link>Cuenta</Link>
				</div>
			) : (
				<div className="login-container">
					<Link>Iniciar Sesion</Link>
					<Link>Registrarse</Link>
				</div>
			)}
		</nav>
	);
}

export default Nav;
