import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import HomepageCards from '../components/home_card/HomepageCards';
import styles from './index.module.css';

const HomepageHeader = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">Fluree for Developers</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className="container">
					<div className="row">

						<div className="col col--4 col--offset-2">
							<Link
								className="card shadow--tl"
								to="/docs/overview/getting_started"
								style={{
									backgroundColor: 'rgb(245, 246, 248)'
								}}
							>

								<div className="card__header">
									<h3 className={styles.cardHeader}>
										Get Started
									</h3>
								</div>

								<div className="card__body">
									<p className={styles.cardBody}>
										Dive right in to Fluree with our no-frills guide to get up and running  as quickly as possible.
									</p>
								</div>

								<div className="card__footer">
									<div className="button button--secondary button--block">
										Learn More
									</div>
								</div>

							</Link>
						</div>

						<div className="col col--4 ">
							<Link
								className="card shadow--tl"
								to="/docs/overview/fluree_basics"
								style={{
									backgroundColor: 'rgb(245, 246, 248)'
								}}
							>

								<div className="card__header">
									<h3 className={styles.cardHeader}>
										Fluree Basics
									</h3>
								</div>

								<div className="card__body">
									<p className={styles.cardBody}>
										Start here for the in-depth guide to learn how to install, operate, and work with data in Fluree.
									</p>
								</div>

								<div className="card__footer">
									<div className="button button--secondary button--block">
										Learn More
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
