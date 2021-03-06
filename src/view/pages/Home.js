import React, {useEffect, useState} from "react";
import ProductService from "../../service/product.service";
import ProductCard from "../components/Product.Card";
import {Col, Row} from "react-bootstrap";
import orderBy from "lodash/sortBy";

const Home = (props) => {
	const {onUpdate} = props;
	const [product, setProduct] = useState([]);
	useEffect(() => {
		getProduct();
	}, []);
	const getProduct = () => {
		ProductService.getAll()
			.then((response) => {
				setProduct(response.data.result);
			}, (error) => {
				console.log(error);
			})
			.catch(e => console.log(e));
	};
	const onBuy = (index) => {
		const products = [...product];
		products.splice(index, 1);
		setProduct(products);
		onUpdate();
	};

	const sortProduct = type => {
		const types = {
			nameAsc: "productName",
			nameDesc: "productName",
			dateAsc: "createDate",
			dateDesc: "createDate",
		};
		const sortProperty = types[type];
		let sorted;
		if (type.includes("name")) {
			sorted = orderBy([...product], [p => p[sortProperty].toLowerCase()], ["asc"]);
		} else {
			sorted = orderBy([...product], [p => p[sortProperty]], ["asc"]);
		}
		if (type.includes("Desc")) {
			sorted = sorted.reverse();
		}
		console.log(sorted);
		setProduct(sorted);
	};

	return (
		<div>
			<div className="py-3 d-flex ml-auto align-items-end flex-column">
				<select onChange={e => sortProduct(e.target.value)} defaultValue="dateAsc">
					<option value="nameAsc">A-Z</option>
					<option value="nameDesc">Z-A</option>
					<option value="dateAsc">Oldest</option>
					<option value="dateDesc">Newest</option>
				</select>
			</div>
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
		</div>
	)
};
export default Home;