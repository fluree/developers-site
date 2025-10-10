import clsx from 'clsx';
import React from 'react';
import Card from './SectionCard';
import styles from './SectionCard.module.css';

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