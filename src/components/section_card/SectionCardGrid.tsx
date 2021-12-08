import React from 'react';
import Card from './SectionCard';

export default function SectionCardGrid({ cardDetails }) {
	return (
		<section className='container'>
			<div className='row'>
				{cardDetails.map((props, index) => (
					<Card key={index} {...props} />
				))}
			</div>
		</section>
	)
}