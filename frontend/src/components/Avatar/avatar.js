import "./avatar.scss";
import { sessionClear } from "../../helpers/storage";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { getUser } from "../../helpers/requests";

function Avatar() {
	const [user, setUser] = useState(" ");

	useEffect(() => {
		getUser(setUser).then(() => console.log(user));
	}, []);

	return (
		<div className="account">
			<div className="dropdown">
				<div className="avatar-form dropdown">
					{user === " " ? (
						<ClipLoader></ClipLoader>
					) : (
						<div className="image-container">
							<img
								src={
									"http://localhost:5000/api/upload/avatar/image/" +
									user.avatar.filename
								}
								alt="avatar"
							/>
						</div>
					)}
				</div>
				<div className="dropdown-content">
					<Link to="/account">Cuenta</Link>
					<br />
					<a href="/login" onClick={() => sessionClear()}>
						Cerrar Sesión
					</a>
				</div>
			</div>
			<Link to="/account">
				<h5>{user.username}</h5>
			</Link>
		</div>
	);
}

export default Avatar;
