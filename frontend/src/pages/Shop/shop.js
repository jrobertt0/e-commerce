import Carousel from "../../components/Carousel/carousel";
import { slideBarItems } from "./items";
import "./shop.scss";

function Shop() {
	return (
		<div className="center">
			<Carousel slides={slideBarItems} />
			<section className="featured">
				<div>
					
				</div>
			</section>
			<section className="all">

			</section>
			<section className="another">

			</section>
		</div>
	);
}

export default Shop;
