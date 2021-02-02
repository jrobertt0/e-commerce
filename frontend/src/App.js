import "./globalStyles/App.scss";
import Login from "./pages/Login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/nav";
import About from "./pages/about";
import Account from "./pages/account/account";
import Shop from "./pages/Shop/shop";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route
						path="/login"
						exact
						component={() => <Login isLogin={true}></Login>}
					></Route>
					<Route
						path="/register"
						exact
						component={() => <Login isLogin={false}></Login>}
					></Route>
					<NestedRoutes>
						<Nav></Nav>
						<Route path="/" exact component={Shop}></Route>
						<Route path="/about" exact component={About}></Route>
						<Route
							path="/account"
							exact
							component={Account}
						></Route>
					</NestedRoutes>
				</Switch>
			</Router>
		</>
	);
}

function NestedRoutes(props) {
	return <div>{props.children}</div>;
}

export default App;
