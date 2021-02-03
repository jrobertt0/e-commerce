import "./account.scss";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import AccountFields from "./accountFields";

function ListAccountFields({
	edit,
	username,
	setUsername,
	name,
	setName,
	email,
	setEmail,
	password,
	setPassword,
}) {
	return (
		<>
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
		</>
	);
}

export default ListAccountFields;