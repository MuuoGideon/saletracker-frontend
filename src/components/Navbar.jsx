import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			{/* NAVBAR */}
			<header className='max-w-7xl mx-auto flex justify-between items-center px-6 py-4'>
				<h1 className='text-2xl font-bold text-emerald-600'>SalesTracker</h1>
				<nav className='space-x-6 hidden md:flex'>
					<Link to='/' className='hover:text-emerald-600'>
						Home
					</Link>
					<Link to='/sales' className='hover:text-emerald-600'>
						Sales
					</Link>
					<Link to='/add-sale' className='hover:text-emerald-600'>
						Add Sale
					</Link>
				</nav>
				<button className='md:hidden p-2 rounded-lg bg-slate-200 dark:bg-slate-800'>
					☰
				</button>
			</header>
		</>
	);
};

export default Navbar;
