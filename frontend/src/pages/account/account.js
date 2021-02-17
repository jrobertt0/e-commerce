import "./account.scss";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
	deleteImage,
	editUser,
	getCurrentUser,
	uploadImage,
} from "../../helpers/requests";
import { FaEdit } from "react-icons/fa";
import ListAccountFields from "./listAccountFields";
import ErrorMsg from "../../components/ErrorMsg/errorMsg";
import NoAuth from "../../components/NoAuth/noAuth";

function Account() {
	const [user, setUser] = useState(" ");
	const [isAuth, setIsAuth] = useState(false);
	const [edit, setEdit] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("&%yPa@");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);

	const [msgs, setMsgs] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const selectPicture = useRef(null);

	const card = useRef(null);
	const container = useRef(null);

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
				setMsgs("Error uploading image");
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

	function animateContainer(e) {
		let xAxis = (window.innerWidth / 2 - e.pageX) / 100;
		let yAxis = (window.innerWidth / 2 - e.pageY) / 100;
		// card.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
	}

	function animateOutContainer(e) {
		// card.current.style.transform = `rotateY(0deg) rotateX(0deg)`
	}
	// function animateCard(e) {}

	useEffect(() => {
		async function aux() {
			let error = await getCurrentUser(setUser);
			setIsLoading(false);
			console.log("error", error);
			if (!error) setIsAuth(true);
		}
		if (user === " ") aux();
		else if (
			username !== user.username ||
			email !== user.email ||
			email !== user.email
		) {
			setEmail(user.email);
			setUsername(user.username);
			setName(user.name);
		} else if (container && container.current && card && card.current) {
			container.current.addEventListener("mousemove", (e) =>
				animateContainer(e)
			);
			container.current.addEventListener("mouseleave", (e) =>
				animateOutContainer(e)
			);
		}
	}, [user, container, card]);

	return (
		<>
			{isLoading ? (
				<div className="container justify-center">
					<ClipLoader></ClipLoader>
				</div>
			) : (
				<>
					{!isAuth ? (
						<NoAuth></NoAuth>
					) : (
						<form
							className="container justify-center"
							onSubmit={handleSubmit}
						>
							<h2>Información de Cuenta</h2>
							<div
								className="card-container space"
								ref={container}
							>
								<div className="card card-big" ref={card}>
									<div className="top-container">
										<div
											className={
												edit ? "hoverable info" : "info"
											}
										>
											<div className="user-image">
												<div className="image-container">
													<img
														src={
															image
																? image
																: "http://localhost:5000/api/upload/avatar/image/" +
																  user.avatar
																		.filename
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
															new Date(
																user.createdAt
															)
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
														onClick={() =>
															handleCancel()
														}
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
													onClick={() =>
														setEdit(true)
													}
												>
													<span>Editar</span>
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						</form>
					)}
				</>
			)}
		</>
	);
}

export default Account;
