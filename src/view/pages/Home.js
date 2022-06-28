import React, {useEffect, useState} from "react";
import ProductService from "../../service/product.service";
import ProductCard from "../components/Product.Card";
import {Col, Row} from "react-bootstrap";

const Home = (props) => {
	const {onUpdate} = props;
	const [product, setProduct] = useState([]);
	useEffect(() => {
		getProduct();
	}, []);
	const getProduct = () => {
		ProductService.getAll()
			.then(response => {
				setProduct(response.data.result);
			})
			.catch(e => console.log(e));
	};
	const onBuy = (index) => {
		const products = [...product];
		products.splice(index, 1);
		setProduct(products);
		onUpdate();
	};

	return (
		<Row xs={1} md={2} lg={3} className="g-4">
			{product && product.map((data, index) => (
				<Col sm key={data.id}>
					<ProductCard
						index={index}
						id={data.id}
						productName={data.productName}
						productImage={data.productImage}
						price={data.price}
						description={data.description}
						onBuy={onBuy}
					/>
				</Col>
			))}
		</Row>
	)
};
export default Home;