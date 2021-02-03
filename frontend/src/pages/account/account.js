import "./account.scss";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
	deleteImage,
	editUser,
	getUser,
	uploadImage,
} from "../../helpers/requests";
import AccountFields from "./accountFields";
import { FaUserAlt, FaLock, FaEdit } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

function Account() {
	const [user, setUser] = useState(" ");
	const [edit, setEdit] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("&%yPa@");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);

	const selectPicture = useRef(null);

	async function handleSubmit(e) {
		e.preventDefault();
		let avatar = user.avatar;
		if (file) {
			const imageRes = await uploadImage(file, "avatar");
			const { status } = await deleteImage(avatar.id, "avatar");
			if(status === "success" ) {
				avatar = imageRes
				console.table(avatar);
				console.table(user.avatar);

			}else {
				return
			}
		}
		const res = await editUser({
			email,
			password: password !== "&%yPa@" ? password : null,
			username,
			name,
			avatar,
		}, setUser);

		setUser(" ");
		setEdit(false);
	}

	function handleImage(e) {
		const imgAux = e.target.files[0];
		setImage(URL.createObjectURL(imgAux));
		setFile(imgAux);
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
						<div
							className={
								edit
									? "image-container hoverable"
									: "image-container"
							}
						>
							<div className="user-image">
								<div className="image-container">
									<img
										src={
											image
												? image
												: "http://localhost:5000/api/upload/avatar/image/" +
												  user.avatar.filename
										}
										alt="avatar"
									/>
								</div>
							</div>
							{edit ? (
								<div
									onClick={() =>
										selectPicture.current.click()
									}
									className="hover-content"
								>
									<FaEdit></FaEdit>
								</div>
							) : (
								<></>
							)}
						</div>
						{edit ? (
							<input
								hidden
								type="file"
								ref={selectPicture}
								onChange={(e) => handleImage(e)}
							/>
						) : (
							<></>
						)}

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
