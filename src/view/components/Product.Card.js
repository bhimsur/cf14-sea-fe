import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import ProductService from "../../service/product.service";
import currencyFormatter from "../../service/helper/currency";

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
			<Card.Img variant="top" src={product.productImage} width={256} height={256}/>
			<Card.Body>
				<Card.Title>{product.productName}</Card.Title>
				<Card.Text>{product.description}</Card.Text>
			</Card.Body>
			<Card.Body>
				<Card.Text>{currencyFormatter.format(product.price)}</Card.Text>
				<Button variant="primary" onClick={buyProduct}>Buy Now</Button>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;