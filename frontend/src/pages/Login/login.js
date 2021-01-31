import "./login.scss";
import { useMediaQuery } from "react-responsive";
import LoginCard from "./loginCard";
import { ReactComponent as Mobile } from "../../assets/img/mobile.svg";

function Login({isLogin}) {
	const isSmall = useMediaQuery({ query: "(max-width: 768px)" });
	return (
		<div className="container">
			{isSmall ? (
				<LoginCard login={isLogin}></LoginCard>
			) : (
				<>
					<div className="login-card-container">
						<LoginCard login={isLogin}></LoginCard>
					</div>
					<div className="ilustration-container">
						<Mobile></Mobile>
					</div>
				</>
			)}
		</div>
	);
}

export default Login;
