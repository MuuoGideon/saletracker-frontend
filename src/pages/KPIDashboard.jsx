import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const KPIDashboard = () => {
	const [sales, setSales] = useState([]);

	const fetchSales = async () => {
		try {
			const res = await fetch('https://gmern-app-2.onrender.com/api/sales');
			if (!res.ok) throw new Error('Failed to fetch sales');
			const data = await res.json();
			setSales(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchSales();
		const interval = setInterval(fetchSales, 5000); // auto-update every 5 seconds
		return () => clearInterval(interval);
	}, []);

	// Group sales by itemName and sum totalPrice
	const chartData = Object.values(
		sales.reduce((acc, sale) => {
			if (acc[sale.itemName]) {
				acc[sale.itemName].totalPrice += sale.totalPrice;
			} else {
				acc[sale.itemName] = {
					name: sale.itemName,
					totalPrice: sale.totalPrice,
				};
			}
			return acc;
		}, {})
	);

	return (
		<div className='max-w-7xl mx-auto px-6 py-16'>
			{/* Dashboard Links */}
			<div className='flex flex-wrap justify-center gap-4 my-6'>
				<div className='flex flex-wrap justify-center gap-4 my-6'>
					<Link
						to='/kpi_dashboard'
						className='px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 hover:shadow-lg transition-all duration-200'
					>
						Total revenue per Product
					</Link>

					<Link
						to='/DayWeekDashDB'
						className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-200'
					>
						Total Revenue per Day/Week/Month
					</Link>

					<Link
						to='/SalesPieChart'
						className='px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 hover:shadow-lg transition-all duration-200'
					>
						Sales Distribution per Item
					</Link>
					<Link
						to='/TotalQuantityDB'
						className='px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 hover:shadow-lg transition-all duration-200'
					>
						Total Quantity Sold
					</Link>
				</div>
			</div>

			<h2 className='text-3xl font-bold mb-6'>Total Revenue Per Product</h2>
			<ResponsiveContainer width='100%' height={400}>
				<BarChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='totalPrice' fill='#142952' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default KPIDashboard;
