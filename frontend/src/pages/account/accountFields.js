import { FaCamera } from "react-icons/fa";

function AccountFields({
	value,
	setValue,
	name,
	icon,
	edit,
	Cname = "",
	type = "text",
}) {
	return (
		<>
			<div className={Cname}>
				<div className={"input-component "}>
					{icon ? icon : <></>}
					{edit ? (
						<input
							value={value}
							autoComplete="false"
							required
							type={type}
							className="input-login"
							placeholder={name}
							onChange={(e) => setValue(e.target.value)}
						/>
					) : (
						<p>{type === "text" ? value : "••••••••"}</p>
					)}
				</div>
			</div>
		</>
	);
}

export default AccountFields;
