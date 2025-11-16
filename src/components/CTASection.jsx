import React from 'react';

const CTASection = () => {
	return (
		<>
			{/* CTA SECTION */}
			<section className='bg-emerald-600 text-white text-center py-16'>
				<h3 className='text-2xl font-bold mb-4'>
					Ready to track your sales efficiently?
				</h3>
				<p className='mb-6 text-emerald-100'>
					Start recording your sales today and monitor your revenue growth.
				</p>
				<a
					href='#get-started'
					className='px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-slate-100 transition'
				>
					Get Started
				</a>
			</section>
		</>
	);
};

export default CTASection;
