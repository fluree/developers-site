import React from 'react';
import Link from '@docusaurus/Link';
import { CardDetails } from '../CardDetails.interface';
import styles from './HomepageCard.module.css';

export default function HomepageCard({ title, description, link, Svg }: CardDetails
): JSX.Element {
    return (
        <article className="col col--4">
            <div
                className="card"
                style={{
                    backgroundColor: '#F1FBFF',
                }}>
                <Link to={link}>
                    <div className={styles.cardContainer}>
                        <div
                            className="card__header"
                            style={{
                                color: 'black'
                            }}>
                            <div
                                className="avatar avatar--vertical"
                                style={{
                                    paddingBottom: '1rem'
                                }}
                            >
                                <div className={styles.svgContainer}>
                                    <Svg alt={title} className={styles.avatarSvg} />
                                </div>
                            </div>
                            <h3 className='text--center'>
                                {title}
                            </h3>
                        </div>
                        <div
                            className="card__body text--center"
                            style={{ color: 'black' }}>
                            <p className={styles.card__text}>
                                {description}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </article>
    );
}