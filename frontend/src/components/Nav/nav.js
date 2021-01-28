import "./nav.scss";
import Avatar from "../Avatar/avatar";

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";
import { useState } from "react";
import SearchBbar from "./searchbar";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { MenuItems } from "./menuItems";

function Nav() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<nav>
			<section className="upper-nav">
				<Logo></Logo>
				<SearchBbar></SearchBbar>
				{loggedIn ? (
					<div className="login-container">
						<Link>
							<Avatar></Avatar>
						</Link>
						<Link>
							<FiShoppingCart></FiShoppingCart>
						</Link>
					</div>
				) : (
					<ul className="login-container">
						<li>
							<Link to="/login">Iniciar Sesion</Link>
						</li>
						<li>
							<Link to="/register">Registrarse</Link>
						</li>
					</ul>
				)}
				<i onClick={() => setOpenMenu((val) => (val = !val))}>
					{openMenu ? (
						<IoMdClose className="menu"></IoMdClose>
					) : (
						<FiMenu className="menu"></FiMenu>
					)}
				</i>
			</section>
			<section className={openMenu ? "down-nav active" : "down-nav"}>
				<ul className="nav-links">
					{MenuItems.map((item, index) => (
						<li
							key={index}
							className={
								(item.cName === "account" && !loggedIn) ||
								(item.cName === "login" && loggedIn) ||
								(["login", "account"].includes(item.cName) &&
									!openMenu)
									? "hidden"
									: ""
							}
						>
							<Link to={item.url}>{item.title}</Link>
						</li>
					))}
				</ul>
			</section>
		</nav>
	);
}

export default Nav;
