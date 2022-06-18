import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import http from "../../service/helper/http-common";

const ProductCard = props => {
	const initialProductState = {
		id: null,
		productName: "",
		productImage: "",
		price: 0,
		description: ""
	}
	const [product, setProduct] = useState(initialProductState);
	const {id} = useParams();
	const buyProduct = (id) => {
		http.post("/buy",).then();
	};
	return (
		<Card style={{width: '18rem'}}>
			<Card.Img variant="top" src={`data:image/jpeg;base64, ${product.productImage}`}/>
			<Card.Body>
				<Card.Title>{product.productName}</Card.Title>
				<Card.Text>{product.description}</Card.Text>
			</Card.Body>
			<Card.Body>
				<Card.Text>{product.price}</Card.Text>
				<Button variant="primary" onClick={buyProduct}>Buy Now</Button>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;