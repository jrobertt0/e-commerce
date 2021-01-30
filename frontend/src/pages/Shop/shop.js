import Nav from "../../components/Nav/nav";
import About from "../../pages/about";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Shop() {
	return (
		<Router>
			<div className="main">
				<Switch>
					<Nav></Nav>
					<Route path="/about" component={About}></Route>
				</Switch>
			</div>
		</Router>
	);
}

export default Shop;
