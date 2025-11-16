import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddSalePage = () => {
	const navigate = useNavigate();

	const [sale, setSale] = useState({
		itemName: '',
		quantity: 1,
		pricePerUnit: 0,
		totalPrice: 0,
		customerName: '',
		notes: '',
	});

	// Update state and recalculate totalPrice
	const handleChange = (e) => {
		const { name, value } = e.target;
		let updatedValue = value;

		// Convert numeric fields to numbers
		if (name === 'quantity' || name === 'pricePerUnit') {
			updatedValue = Number(value);
		}

		const updatedSale = { ...sale, [name]: updatedValue };

		// Recalculate totalPrice
		updatedSale.totalPrice = updatedSale.quantity * updatedSale.pricePerUnit;

		setSale(updatedSale);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!sale.itemName.trim()) {
			return toast.error('Item Name is required');
		}

		try {
			// Send JSON instead of FormData
			const res = await fetch('https://gmern-app-2.onrender.com/api/sales', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					itemName: sale.itemName,
					quantity: sale.quantity,
					pricePerUnit: sale.pricePerUnit,
					customerName: sale.customerName,
					notes: sale.notes,
					// totalPrice will be auto-calculated by Mongoose pre-save hook
				}),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to add sale');
			}

			toast.success('Sale Added Successfully');
			navigate('/sales');
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<form className='grid sm:grid-cols-2 gap-4 my-6' onSubmit={handleSubmit}>
			<input
				type='text'
				name='itemName'
				placeholder='Item Name'
				value={sale.itemName}
				onChange={handleChange}
				className='border rounded px-3 py-2'
			/>
			<input
				type='number'
				name='quantity'
				placeholder='Quantity'
				value={sale.quantity}
				onChange={handleChange}
				className='border rounded px-3 py-2'
			/>
			<input
				type='number'
				name='pricePerUnit'
				placeholder='Price per Unit'
				value={sale.pricePerUnit}
				onChange={handleChange}
				className='border rounded px-3 py-2'
			/>
			<input
				type='number'
				name='totalPrice'
				placeholder='Total Price'
				value={sale.totalPrice}
				readOnly
				className='border rounded px-3 py-2 bg-gray-100'
			/>
			<input
				type='text'
				name='customerName'
				placeholder='Customer Name'
				value={sale.customerName}
				onChange={handleChange}
				className='border rounded px-3 py-2'
			/>
			<input
				type='text'
				name='notes'
				placeholder='Notes'
				value={sale.notes}
				onChange={handleChange}
				className='border rounded px-3 py-2'
			/>

			<button
				type='submit'
				className='col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
			>
				Add Sale
			</button>
		</form>
	);
};

export default AddSalePage;
