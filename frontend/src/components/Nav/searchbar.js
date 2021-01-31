import "./nav.scss";
import { FiSearch } from "react-icons/fi";

function SearchBbar({ keyword, setKeyword }) {
	return (
		<div className="search-container">
			<input
				className="search-bar"
				key="random1"
				value={keyword}
				placeholder={"Buscar"}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<FiSearch></FiSearch>
		</div>
	);
}

export default SearchBbar;
