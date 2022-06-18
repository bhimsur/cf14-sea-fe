import React, {useEffect, useState} from "react";
import ProductService from "../../service/product.service";
import {useNavigate, useParams} from "react-router-dom";

const ProductDetail = props => {
	const {id} = useParams();
	let navigate = useNavigate();
	const initProductDetail = {
		id: null,
		productName: "",
		productImage: "",
		description: "",
		price: 0,
		userId: null,
	};

	const [currentProduct, setCurrentProduct] = useState(initProductDetail);
	const [message, setMessage] = useState("");
	const getProduct = () => {
		const data = {
			id: id
		};
		ProductService.get(data)
			.then(response => {
				setCurrentProduct(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	};

	useEffect(() => {
		if (id) {
			getProduct(id);
		}
	}, [id]);

	const buyProduct = () => {
		const data = {
			productId: id
		};
		ProductService.buy(data)
			.then(response => {
				navigate("/");
			})
			.catch(e => {
				console.log(e);
			});
	};

	return (
		<div>
			{currentProduct ? (
				<div className="edit-form">
					<h4>
						<form>
							<div className="form-group">
								<label htmlFor="productName">Product Name</label>
								<input
									type="text"
									className="form-control"
									id="productName"
									name="productName"
									value={currentProduct.productName}
								/>
							</div>
						</form>
					</h4>
				</div>
			) : (
				<div><br>
					<p></p>
				</br></div>
			)}
		</div>
	)
};


export default ProductDetail;