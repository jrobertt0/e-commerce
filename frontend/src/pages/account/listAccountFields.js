import "./account.scss";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { lazy, Suspense } from "react";
import DotLoader from "react-spinners/DotLoader";

const AccountFields = lazy(() => import("./accountFields"));

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
			<Suspense fallback={<DotLoader></DotLoader>}>
				<AccountFields
					value={username}
					setValue={setUsername}
					name="Usuario"
					icon={<HiMail className="icon"></HiMail>}
					edit={edit}
					Cname="field"
				/>
			</Suspense>
			<Suspense fallback={<DotLoader></DotLoader>}>
				<AccountFields
					value={name}
					setValue={setName}
					name="Nombre"
					icon={<FaUserAlt className="icon"></FaUserAlt>}
					edit={edit}
					Cname="field"
				/>
			</Suspense>
			<Suspense fallback={<DotLoader></DotLoader>}>
				<AccountFields
					value={email}
					setValue={setEmail}
					name="Email"
					icon={<HiMail className="icon"></HiMail>}
					edit={edit}
					Cname="field"
				/>
			</Suspense>
			<Suspense fallback={<DotLoader></DotLoader>}>
				<AccountFields
					value={password}
					setValue={setPassword}
					name="Contraseña"
					type="password"
					icon={<FaLock className="icon"></FaLock>}
					edit={edit}
					Cname="field"
				/>
			</Suspense>
		</>
	);
}

export default ListAccountFields;
