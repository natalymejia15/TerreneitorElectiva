 import React from "react";
 import "../.././index.css";

export const NewProduct = () => {
    return (
        <>
		<div className="md:flex max-w-md mx-auto bg-white rounded-xl shadow-2xl border overflow-hidden md:max-w-2xl m-4">
			<div className="product_box">
				<div className="addproduct_container">
					<span className="signup_message text-center ml-10">
						Add your product here
					</span>
                    <br />
					<form>
						<label htmlFor="name">Name</label>
						<input
							className="name_field"
							type="text"
							name="name"
							placeholder="Product Name..."
						/>
						<label htmlFor="name">Description</label>
						<input
							className="name_field"
							type="text"
							name="name"
							placeholder="Description..."
						/>
						<label htmlFor="name">Tags</label>
						<input
							className="name_field"
							type="text"
							name="name"
							placeholder="productivity, desgin tools"
						/>
						<label htmlFor="name">Image url</label>
						<input
							className="name_field"
							type="text"
							name="name"
							placeholder="Image url..."
						/>
						<input
							className="submit_button"
							type="submit"
							value="Submit"
						/>
					</form>
				</div>
			</div>
		</div>
        </>
	)
}
