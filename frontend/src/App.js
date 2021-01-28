import "./globalStyles/App.scss";
import Shop from "./pages/Shop/shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="main">
				<Switch>
					<Route path="/" exact component={Shop}></Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
