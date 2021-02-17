import "./nav.scss";
import Avatar from "../Avatar/avatar";

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";
import { useState, useEffect } from "react";
import SearchBbar from "./searchbar";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

import { MenuItems } from "./menuItems";
import { getToken, sessionClear } from "../../helpers/storage";

function Nav() {
	const isSmall = useMediaQuery({ query: "(max-width: 768px)" });

	const [loggedIn, setLoggedIn] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		if (!isSmall) setOpenMenu(false);
		const token = getToken();
		setLoggedIn(token ? true : false);
		console.log("hey");
	}, [isSmall]);

	return (
		<nav>
			<section className="upper-nav">
				<Link to="/">
					<Logo></Logo>
				</Link>
				<SearchBbar></SearchBbar>
				{loggedIn ? (
					<div className="login-container">
						<Avatar></Avatar>
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
				{isSmall ? (
					<i onClick={() => setOpenMenu((val) => (val = !val))}>
						{openMenu ? (
							<IoMdClose className="menu"></IoMdClose>
						) : (
							<FiMenu className="menu"></FiMenu>
						)}
					</i>
				) : (
					<></>
				)}
			</section>
			<section
				className={
					openMenu
						? "down-nav active nav-gradient"
						: "down-nav nav-gradient"
				}
			>
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
							{item.url === "/login" ? (
								<a
									href="/login"
									onClick={() => {
										setOpenMenu((val) => (val = !val));
										sessionClear();
									}}
								>
									{item.title}
								</a>
							) : (
								<Link
									to={item.url}
									onClick={() =>
										setOpenMenu((val) =>
											isSmall ? (val = !val) : val
										)
									}
								>
									{item.title}
								</Link>
							)}
						</li>
					))}
				</ul>
			</section>
		</nav>
	);
}

export default Nav;
