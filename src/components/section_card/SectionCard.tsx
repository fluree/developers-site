import React from 'react'
import Link from '@docusaurus/Link';
import { CardDetails } from './CardDetails.interface';
import styles from './SectionCard.module.css';
import RightArrowSvg from '../../../static/img/RightArrow_large.svg';
import clsx from 'clsx';


export default function SectionCard({ title, description, link }: CardDetails): JSX.Element {
	return (
		<section className={clsx('col col--5', styles.sectionCardCol)}>
			<Link to={link} className={clsx('card margin--sm', styles.sectionCard)}>
				<div className="card__header">
					<h2>{title}</h2>
				</div>
				<div className="card__body">
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
		</section>
	);
}