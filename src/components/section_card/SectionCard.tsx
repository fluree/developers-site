import React from 'react'
import Link from '@docusaurus/Link';
import { CardDetails } from './CardDetails.interface'
import RightArrowSvg from '../../../static/img/RightArrow_large.svg';


export default function SectionCard({ title, description, link }: CardDetails): JSX.Element {
	return (
		<Link to={link} className="card margin--md col col--5 card__link">
			<div className="card__header">
				<h2>{title}</h2>
			</div>
			<div className="card__body text__body">
				<p>
					{description}
				</p>
			</div>
			<div className="card__footer">
				<div className="button button--link button--block">
					<RightArrowSvg alt="right arrow icon" />
				</div>
			</div>
		</Link>
	);
}