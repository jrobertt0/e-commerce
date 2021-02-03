import "./account.scss";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
	deleteImage,
	editUser,
	getUser,
	uploadImage,
} from "../../helpers/requests";
import { FaEdit } from "react-icons/fa";
import ListAccountFields from "./listAccountFields";
import ErrorMsg from "../../components/ErrorMsg/errorMsg";

function Account() {
	const [user, setUser] = useState(" ");
	const [edit, setEdit] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("&%yPa@");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);

	const [msgs, setMsgs] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const selectPicture = useRef(null);

	async function handleSubmit(e) {
		e.preventDefault();
		let avatar = user.avatar;
		setIsLoading(true);
		if (file) {
			const imageRes = await uploadImage(file, "avatar");
			const { status } = await deleteImage(avatar.id, "avatar");
			if (status === "success") {
				avatar = imageRes;
				console.table(avatar);
				console.table(user.avatar);
			} else {
				setIsLoading(false);
				setMsgs(res);
				return;
			}
		}
		const res = await editUser(
			{
				email,
				password: password !== "&%yPa@" ? password : null,
				username,
				name,
				avatar,
			},
			setUser
		);

		setIsLoading(false);

		if (res.Error) {
			setMsgs(res.Error);
			setTimeout(() => setMsgs(""), 2000);
			return;
		}

		setUser(" ");
		setEdit(false);
	}

	function handleCancel() {
		setEmail(user.email);
		setUsername(user.username);
		setName(user.name);
		setPassword("&%yPa@");
		setImage(null);
		setFile(null);
		setEdit(false);
	}

	function handleImage(e) {
		const imgAux = e.target.files[0];
		setImage(URL.createObjectURL(imgAux));
		setFile(imgAux);
	}

	function formatDate(date) {
		return `${date.getMonth() + 1}/${
			date.getDay() + 1
		}/${date.getFullYear()}`;
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
			console.log(user.createdAt);
		}
	}, [user]);

	return (
		<form className="container justify-center" onSubmit={handleSubmit}>
			{user === " " || isLoading ? (
				<ClipLoader></ClipLoader>
			) : (
				<>
					<h2>Información de Cuenta</h2>
					<div className="card-container space-y">
						<div className="card card-big">
							<div
								className={
									edit
										? "top-container hoverable"
										: "top-container"
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
								<div className="additionalData">
									<p>
										Miembro desde: <br />
										<span>
											{formatDate(
												new Date(user.createdAt)
											)}
										</span>
									</p>
									{user.admin ? (
										<div className="admin">
											<span>Admin</span>
										</div>
									) : (
										<></>
									)}
								</div>
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

							<div className="medium-container">
								<ListAccountFields
									edit={edit}
									username={username}
									setUsername={setUsername}
									name={name}
									setName={setName}
									email={email}
									setEmail={setEmail}
									password={password}
									setPassword={setPassword}
								/>
								<ErrorMsg msgs={msgs} />
								<div className="buttons-container">
									{edit ? (
										<>
											<button
												className="btn cancel"
												name="cancel"
												type="button"
												onClick={() => handleCancel()}
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
					</div>
				</>
			)}
		</form>
	);
}

export default Account;
