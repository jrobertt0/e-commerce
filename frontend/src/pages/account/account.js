import "./account.scss";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { editUser, getUser } from "../../helpers/requests";
import AccountFields from "./accountFields";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

function Account() {
	const [user, setUser] = useState(" ");
	const [edit, setEdit] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("password");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");

	async function handleSubmit(e) {
		const avatar = user.avatar;
		setPassword(password !== "password" ? password : user.password);
		e.preventDefault();
		const res = await editUser({
			email,
			password,
			username,
			name,
			avatar,
		}).then(() => setPassword("password"));
		console.log("res", res);
	}

	useEffect(() => {
		async function aux() {
			await getUser(setUser).then(() => console.log(user));
		}
		if (user === " ") aux();
		else {
			setEmail(user.email);
			setUsername(user.username);
			setName(user.name);
			console.log(user);
		}
	}, [user]);

	return (
		<form className="container" onSubmit={handleSubmit}>
			{user === " " ? (
				<ClipLoader></ClipLoader>
			) : (
				<div className="card-container space-y">
					<div className="card">
						<img
							className="user-image"
							src={
								"http://localhost:5000/api/upload/item/image/" +
								user.avatar.filename
							}
							alt="avatar"
						/>
						{edit ? <input hidden type="file" /> : <></>}

						<AccountFields
							value={username}
							setValue={setUsername}
							name="Usuario"
							icon={<HiMail className="icon"></HiMail>}
							edit={edit}
							Cname="field"
						/>
						<AccountFields
							value={name}
							setValue={setName}
							name="Nombre"
							icon={<FaUserAlt className="icon"></FaUserAlt>}
							edit={edit}
							Cname="field"
						/>
						<AccountFields
							value={email}
							setValue={setEmail}
							name="Email"
							icon={<HiMail className="icon"></HiMail>}
							edit={edit}
							Cname="field"
						/>
						<AccountFields
							value={password}
							setValue={setPassword}
							name="Contraseña"
							type="password"
							icon={<FaLock className="icon"></FaLock>}
							edit={edit}
							Cname="field"
						/>

						<div className="buttons-container">
							{edit ? (
								<>
									<button
										className="btn cancel"
										name="cancel"
										type="button"
										onClick={() => setEdit(false)}
									>
										<span>Cancelar</span>
									</button>
									<button
										className="btn save"
										type="submit"
										name="send"
									>
										<span>Guardar</span>
									</button>
								</>
							) : (
								<button
									type="button"
									name="edit"
									className="btn primary-gradient"
									onClick={() => setEdit(true)}
								>
									<span>Editar</span>
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</form>
	);
}

export default Account;
