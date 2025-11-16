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
import { format, parseISO } from 'date-fns';

const DayWeekDashDB = () => {
	const [sales, setSales] = useState([]);
	const [groupBy, setGroupBy] = useState('day'); // 'day' | 'week' | 'month'

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

	const groupSales = (sales) => {
		const grouped = {};
		sales.forEach((sale) => {
			const date = parseISO(sale.createdAt);
			let key;
			switch (groupBy) {
				case 'day':
					key = format(date, 'yyyy-MM-dd');
					break;
				case 'week':
					const weekNumber = Math.ceil(
						(date.getDate() + 6 - date.getDay()) / 7
					);
					key = `${date.getFullYear()}-W${weekNumber}`;
					break;
				case 'month':
					key = format(date, 'yyyy-MM');
					break;
				default:
					key = format(date, 'yyyy-MM-dd');
			}

			if (!grouped[key]) grouped[key] = 0;
			grouped[key] += sale.totalPrice;
		});

		return Object.entries(grouped).map(([name, totalPrice]) => ({
			name,
			totalPrice,
		}));
	};

	const chartData = groupSales(sales);

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
			<h2 className='text-3xl font-bold mb-6'>
				Total Sales Per Day/Week/Month
			</h2>

			<div className='mb-6 flex gap-4'>
				<button
					className={`px-4 py-2 rounded ${
						groupBy === 'day' ? 'bg-emerald-600 text-white' : 'bg-slate-500'
					}`}
					onClick={() => setGroupBy('day')}
				>
					Day
				</button>
				<button
					className={`px-4 py-2 rounded ${
						groupBy === 'week' ? 'bg-emerald-600 text-white' : 'bg-slate-500'
					}`}
					onClick={() => setGroupBy('week')}
				>
					Week
				</button>
				<button
					className={`px-4 py-2 rounded ${
						groupBy === 'month' ? 'bg-emerald-600 text-white' : 'bg-slate-500'
					}`}
					onClick={() => setGroupBy('month')}
				>
					Month
				</button>
			</div>

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
					<Bar dataKey='totalPrice' fill='#003333' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default DayWeekDashDB;
