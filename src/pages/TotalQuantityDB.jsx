import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { toast } from 'react-toastify';

const TotalQuantityDB = () => {
	const [sales, setSales] = useState([]);

	useEffect(() => {
		const fetchSales = async () => {
			try {
				const res = await fetch('https://gmern-app-2.onrender.com/api/sales');
				if (!res.ok) throw new Error('Failed to fetch sales');
				const data = await res.json();
				setSales(data);
			} catch (err) {
				toast.error(err.message);
			}
		};

		fetchSales();
	}, []);

	// Prepare data for the line chart: sum quantities by itemName
	const chartData = sales.map((sale) => ({
		name: sale.itemName,
		quantity: sale.quantity,
	}));

	return (
		<>
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
			<div className='w-full h-96 p-4 bg-black rounded shadow'>
				<h2 className='text-xl font-semibold mb-4'>Sales Quantities</h2>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='quantity'
							stroke='#0000ff'
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	);
};

export default TotalQuantityDB;
