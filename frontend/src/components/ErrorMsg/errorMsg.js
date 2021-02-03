import './errorMsg.scss';

function ErrorMsg({msgs}) {
	return (
		<div className={msgs === "" ? "error-msgs" : "error-msgs active"}>
			<h5>{msgs}</h5>
		</div>
	);
}

export default ErrorMsg;