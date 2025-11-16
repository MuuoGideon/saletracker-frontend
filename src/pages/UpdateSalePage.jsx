import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateSalePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [sale, setSale] = useState({
		itemName: '',
		quantity: 1,
		pricePerUnit: 0,
		totalPrice: 0,
		customerName: '',
		notes: '',
	});

	useEffect(() => {
		const fetchSale = async () => {
			try {
				const res = await fetch(
					`https://gmern-app-2.onrender.com/api/sales/${id}`
				);
				if (!res.ok) throw new Error('Failed to load sale');
				const data = await res.json();

				setSale({
					...data,
					quantity: Number(data.quantity),
					pricePerUnit: Number(data.pricePerUnit),
					totalPrice: Number(data.quantity) * Number(data.pricePerUnit),
				});
			} catch (err) {
				toast.error(err.message);
			}
		};
		fetchSale();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		let updatedValue = value;

		// Convert numeric fields to numbers
		if (name === 'quantity' || name === 'pricePerUnit') {
			updatedValue = Number(value);
		}

		const updatedSale = { ...sale, [name]: updatedValue };

		// Auto-calc totalPrice
		updatedSale.totalPrice = updatedSale.quantity * updatedSale.pricePerUnit;

		setSale(updatedSale);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`https://gmern-app-2.onrender.com/api/sales/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						itemName: sale.itemName,
						quantity: sale.quantity,
						pricePerUnit: sale.pricePerUnit,
						customerName: sale.customerName,
						notes: sale.notes,
						// totalPrice is calculated automatically in Mongoose
					}),
				}
			);

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to update sale');
			}

			toast.success('Sale updated successfully');
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
				className='col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700'
			>
				Update Sale
			</button>
		</form>
	);
};

export default UpdateSalePage;
