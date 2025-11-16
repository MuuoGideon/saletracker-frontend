import React from 'react';
import MainLayout from './mainLayout/MainLayout';
import HomePage from './pages/HomePage';
import SalesPage from './pages/SalesPage';
import SalePage, { saleLoader } from './pages/SalePage';
import AddSalePage from './pages/AddSalePage';
import UpdateSalePage from './pages/UpdateSalePage';

import KPIDashboard from './pages/KPIDashboard';
import SalesPieChart from './pages/SalesPieChart';
import DayWeekDashDB from './pages/DayWeekDashDB';
import TotalQuantityDB from './pages/TotalQuantityDB';

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/add-sale' element={<AddSalePage />} />
				<Route path='/sales/update/:id' element={<UpdateSalePage />} />
				<Route path='/sales/:id' element={<SalePage />} loader={saleLoader} />
				<Route path='/kpi_dashboard' element={<KPIDashboard />} />
				<Route path='/DayWeekDashDB' element={<DayWeekDashDB />} />
				<Route path='/lineChartDB' element={<KPIDashboard />} />
				<Route path='/SalesPieChart' element={<SalesPieChart />} />
				<Route path='/TotalQuantityDB' element={<TotalQuantityDB />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
