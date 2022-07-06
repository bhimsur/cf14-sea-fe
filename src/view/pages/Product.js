import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProductService from "../../service/product.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Figure} from "react-bootstrap";
import Compress from "compress.js";


const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const compress = new Compress();

const Product = () => {
	const form = useRef();
	const checkBtn = useRef();
	let navigate = useNavigate();
	const [previewImage, setPreviewImage] = useState(false);
	const [image, setImage] = useState("");
	const [productName, setProductName] = useState("");
	const [productImage, setProductImage] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");
	const [progress, setProgress] = useState(0);

	const onChangeProductName = e => {
		setProductName(e.target.value);
	}

	const onChangeProductDescription = e => {
		setProductDescription(e.target.value);
	}

	const onChangeProductPrice = e => {
		setProductPrice(e.target.value);
	}

	const onChangeProductImage = e => {
		const productImage = e.target.files[0];
		getBase64(productImage).then();
		setPreviewImage(true);
		setImage(URL.createObjectURL(productImage));
	}

	const getBase64 = async (file) => {
		const resize = await compress.compress([file], {
			size: 2,
			quality: 1,
			maxWidth: 256,
			maxHeight: 256,
			resize: true
		});
		const image = resize[0];
		const data = image.prefix.concat(image.data);
		setProductImage(data);
}

	const handleAddProduct = e => {
		e.preventDefault();
		setMessage("");
		setSuccess(false);
		form.current.validateAll();
		if (checkBtn.current.context._errors.length === 0) {
			const data = {
				productName: productName,
				productImage: productImage,
				description: productDescription,
				price: productPrice
			};
			ProductService.add(data, event => {
				setProgress(Math.round((100 * event.loaded) / event.total));
			})
				.then((response) => {
					setMessage(response.data.success);
					setSuccess(true);
				}, (error) => {
					const resMessage = (error.response && error.response.data) || error.message || error.toString();
					setProgress(0);
					setMessage(resMessage);
					setSuccess(false);
				})
				.then(() => {
					navigate("/");
					window.location.reload();
				});
		}
	};

	return (
		<div className="col-md-12">
			<div className="card card-container p-3 px-4">
				<Form onSubmit={handleAddProduct} ref={form}>
					{!success && (
						<div>
							<div className="form-group">
								<label htmlFor="productName">Product Name</label>
								<Input
									type="text"
									className="form-control"
									name="productName"
									value={productName}
									onChange={onChangeProductName}
									validations={[required]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="productDescription">Product Description</label>
								<Input
									type="text"
									className="form-control"
									name="productDescription"
									value={productDescription}
									onChange={onChangeProductDescription}
									validations={[required]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="productPrice">Product Price</label>
								<Input
									type="text"
									className="form-control"
									name="productPrice"
									value={productPrice}
									onChange={onChangeProductPrice}
									validations={[required]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="productImage">Product Image</label>
								<Input
									type="file"
									className="form-control"
									name="productImage"
									onChange={onChangeProductImage}
								/>
							</div>

							{previewImage && (
								<Figure>
									<Figure.Image
										width={256}
										height={256}
										src={image}
									/>
								</Figure>
							)}

							<div className="form-group">
								<button className="btn btn-primary btn-block">Submit</button>
							</div>
						</div>
					)}
					{message && (
						<div className="form-group">
							<div className={success ? "alert alert-success" : "alert alert-danger"} role="alert">
								{message}
							</div>
						</div>
					)}
					<CheckButton style={{display: "none"}} ref={checkBtn}/>
				</Form>
			</div>
		</div>
	);

};

export default Product;