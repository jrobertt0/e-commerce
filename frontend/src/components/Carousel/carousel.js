import "./carousel.scss";

function Carousel({ slides }) {
	return (
		<div className="carousel-container">
			<div className="carousel">
				<ul className="panes">
					{slides.map((product, index) => (
						<li key={index}>{Slide(product)}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

function Slide({ img, name, info, link }) {
	return (
		<>
			<div className="product-info">
				<div className="header">
					<h2>{name}</h2>
					<a href={link}>Ver Mas</a>
				</div>
				<div className="content">
					<p>{info}</p>
				</div>
			</div>
			<img src={img} alt="" />
		</>
	);
}

export default Carousel;
