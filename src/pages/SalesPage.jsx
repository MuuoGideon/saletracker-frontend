import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SalesPage = () => {
	const [sales, setSales] = useState([]);

	useEffect(() => {
		const fetchSales = async () => {
			try {
				const res = await fetch('https://gmern-app-2.onrender.com/api/sales');
				const data = await res.json();
				setSales(data);
			} catch (err) {
				toast.error('Failed to fetch sales');
			}
		};

		fetchSales();
	}, []);

	return (
		<div className='relative bg-#336699 rounded-xl p-6 shadow-[0_0_20px_5px_rgba(59,130,246,0.8)]'>
			{sales.map((sale) => (
				<div
					key={sale._id}
					className='relative bg-#336699 rounded-xl my-5 p-6 shadow-[0_0_20px_5px_rgba(59,130,246,0.8)]'
				>
					<h2 className='font-semibold text-3xl'>{sale.itemName}</h2>
					<p className='text-md text-gray-600'>
						Customer:{' '}
						<span className='font-medium text-xl'>{sale.customerName}</span>
					</p>
					<p className='text-sm text-gray-600'>
						Quantity:{' '}
						<span className='font-medium text-xl'>{sale.quantity}</span>
					</p>
					<p className='text-sm text-gray-600'>
						Price per unit:{' '}
						<span className='font-medium text-xl'>Ksh {sale.pricePerUnit}</span>
					</p>
					<p className='text-sm my-5 text-gray-600'>
						Total Price:
						<span className='font-medium text-xl'> Ksh {sale.totalPrice}</span>
					</p>

					<Link
						to={`/sales/${sale._id}`}
						className='px-6 py-1 my-5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition'
					>
						View Details →
					</Link>
				</div>
			))}
		</div>
	);
};

export default SalesPage;
