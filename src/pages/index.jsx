import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import HomepageCards from '../components/home_card/HomepageCards';
import styles from './index.module.css';
import RightArrowSvg from '../../static/img/RightArrow.svg';

const HomepageHeader = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">Fluree for Developers</h1>
				<p
					className="hero__subtitle"
					style={{
						marginBottom: '50px'
					}}
				>
					{siteConfig.tagline}
				</p>
				<div className="container">
					<div className="row">

						<div className="col col--4 col--offset-2">
							<Link
								className={clsx('card shadow--tl padding--md', styles.bannerCard)}
								to="/docs/overview/getting_started">

								<div className="card__header">
									<h3 className={styles.cardHeader}>
										Get Started
									</h3>
								</div>

								<div className="card__body">
									<p className={styles.cardBody}>
										Dive in to Fluree with our no-frills guide to get up and running  as quickly as possible.
									</p>
								</div>

								<div className="card__footer">
									<div className="button button--link button--block">
										Learn More
										<RightArrowSvg alt="right arrow icon" />
									</div>
								</div>
							</Link>
						</div>

						<div className="col col--4 ">
							<Link
								className={clsx('card shadow--tl padding--md', styles.bannerCard)}
								to="/docs/overview/fluree_basics">

								<div className="card__header">
									<h3 className={styles.cardHeader}>
										Fluree Basics
									</h3>
								</div>

								<div className="card__body">
									<p className={styles.cardBody}>
										Visit our in-depth guide on how to install and operate Fluree, and working with data in Fluree.
									</p>
								</div>

								<div className="card__footer">
									<div className="button button--link button--block">
										Learn More
										<RightArrowSvg alt="right arrow icon" />
									</div>
								</div>
							</Link>
						</div>

					</div>
				</div>
			</div>
		</header>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`${siteConfig.title}`}
			description={`${siteConfig.tagline}`}>
			<HomepageHeader />
			<HomepageCards />
		</Layout>
	);
}
