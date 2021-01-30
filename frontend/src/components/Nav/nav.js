import "./nav.scss";
import Avatar from "../Avatar/avatar";

import { Link, useRouteMatch } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";
import { useState, useEffect } from "react";
import SearchBbar from "./searchbar";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

import { MenuItems } from "./menuItems";
import { getToken } from "../../helpers/storage";

function Nav() {
	const isSmall = useMediaQuery({ query: "(max-width: 768px)" });

	const [loggedIn, setLoggedIn] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		if (!isSmall) setOpenMenu(false);
		const token = getToken()
		setLoggedIn( token ? true : false);
	}, [isSmall]);

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
							<a href="/login">Iniciar Sesion</a>
						</li>
						<li>
							<a href="/register">Registrarse</a>
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
