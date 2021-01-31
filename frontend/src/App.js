import "./globalStyles/App.scss";
import Shop from "./pages/Shop/shop";
import Login from "./pages/Login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

	return (
		<Router>
			<div className="main">
				<Switch>
					<Route path="/" exact component={Shop}></Route>
					<Route
						path="/login"
						exact
						component={() => <Login isLogin={true} ></Login>}
					></Route>
					<Route
						path="/register"
						exact
						component={() => <Login isLogin={false}></Login>}
					></Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
