import "./globalStyles/App.scss";
import Nav from "./components/Nav/nav";
import About from "./pages/about";
import Shop from "./pages/Shop/shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="main">
				<Nav></Nav>
				<Switch>
					<Route path="/" exact component={Home}></Route>
					<Route path="/about" component={About}></Route>
					<Route path="/shop" component={Shop}></Route>
				</Switch>
			</div>
		</Router>
	);
}

const Home = () => (
	<div>
		<h1>Home Page</h1>
	</div>
);

export default App;
