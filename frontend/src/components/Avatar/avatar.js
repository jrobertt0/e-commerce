import "./avatar.scss";
import { getToken, sessionClear } from "../../helpers/storage";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

function Avatar() {
	const [user, setUser] = useState(" ");

	async function getUser(credentials) {
		const token = getToken();
		const response = await fetch("http://localhost:5000/api/account/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": token,
			},
			body: JSON.stringify(credentials),
		});
		const remoteUser = await response.json();
		setUser(remoteUser);
	}

	useEffect(async () => {
		await getUser().then(() => console.log(user));
	}, []);

	return (
		<div className="account">
			<div className="dropdown">
				<div className="avatar-form dropdown">
					{user === " " ? (
						<ClipLoader></ClipLoader>
					) : (
						<img
							src={
								"http://localhost:5000/api/upload/item/image/" +
								user.avatar.filename
							}
							alt="avatar"
						/>
					)}
				</div>
				<div className="dropdown-content">
					<Link to="/account">Cuenta</Link>
					<br />
					<a href="/login" onClick={() => sessionClear()}>Cerrar Sesión</a>
				</div>
			</div>
			<Link to="/account">
				<h5>{user.username}</h5>
			</Link>
		</div>
	);
}

export default Avatar;
