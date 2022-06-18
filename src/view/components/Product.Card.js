import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import ProductService from "../../service/product.service";

const ProductCard = props => {
	const initialProductState = {
		id: props.id,
		productName: props.productName,
		productImage: props.productImage,
		price: props.price,
		description: props.description,
	};
	const [product, setProduct] = useState(initialProductState);
	const buyProduct = () => {
		console.log(props.index);
		const data = {
			productId: product.id
		};
		ProductService.buy(data)
			.then(response => {
				if (response.status === 200) {
					props.onBuy(props.index);
				}
			})
			.catch(e => console.log(e));
	};
	return (
		<Card style={{width: "18rem", margin: "auto", marginBottom: "1.8rem"}}>
			<Card.Img variant="top" src={`data:image/jpeg;base64, ${product.productImage}`}/>
			<Card.Body>
				<Card.Title>{product.productName}</Card.Title>
				<Card.Text>{product.description}</Card.Text>
			</Card.Body>
			<Card.Body>
				<Card.Text>Rp. {product.price}</Card.Text>
				<Button variant="primary" onClick={buyProduct}>Buy Now</Button>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;