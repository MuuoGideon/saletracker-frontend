// src/pages/SalesLineChart.jsx
import React, { useState, useEffect } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts';

const SalesLineChart = () => {
	const [sales, setSales] = useState([]);
	const [groupBy, setGroupBy] = useState('day'); // 'day', 'week', 'month'
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		const fetchSales = async () => {
			try {
				const res = await fetch('https://gmern-app-2.onrender.com/api/sales'); // adjust endpoint
				const data = await res.json();
				setSales(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchSales();
	}, []);

	useEffect(() => {
		if (!sales || sales.length === 0) return;

		// Helper to get week number
		const getWeek = (date) => {
			const d = new Date(date);
			d.setHours(0, 0, 0, 0);
			d.setDate(d.getDate() + 4 - (d.getDay() || 7));
			const yearStart = new Date(d.getFullYear(), 0, 1);
			const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
			return weekNo;
		};

		const grouped = {};

		sales.forEach((sale) => {
			const date = new Date(sale.createdAt);
			let key;
			if (groupBy === 'day') {
				key = date.toISOString().split('T')[0]; // YYYY-MM-DD
			} else if (groupBy === 'week') {
				key = `${date.getFullYear()}-W${getWeek(date)}`;
			} else if (groupBy === 'month') {
				key = `${date.getFullYear()}-${(date.getMonth() + 1)
					.toString()
					.padStart(2, '0')}`;
			}
			if (!grouped[key]) grouped[key] = 0;
			grouped[key] += sale.quantity * sale.pricePerUnit;
		});

		const chartArray = Object.keys(grouped)
			.sort()
			.map((key) => ({ period: key, totalSales: grouped[key] }));

		setChartData(chartArray);
	}, [sales, groupBy]);

	return (
		<>
			<div className='max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md'>
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
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-2xl font-bold text-emerald-600'>Sales Trend</h2>
					<select
						value={groupBy}
						onChange={(e) => setGroupBy(e.target.value)}
						className='border rounded px-3 py-1'
					>
						<option value='day'>Day</option>
						<option value='week'>Week</option>
						<option value='month'>Month</option>
					</select>
				</div>

				{chartData.length === 0 ? (
					<p className='text-center text-gray-500'>No sales data available</p>
				) : (
					<ResponsiveContainer width='100%' height={300}>
						<LineChart
							data={chartData}
							margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='period' />
							<YAxis />
							<Tooltip />
							<Line
								type='monotone'
								dataKey='totalSales'
								stroke='#10B981'
								strokeWidth={3}
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</div>
		</>
	);
};

export default SalesLineChart;
