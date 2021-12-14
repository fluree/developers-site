import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import { CardDetails } from '../../components/section_card/CardDetails.interface';
import styles from './Community.module.css';

export default function CommunityCard(
    { title, description, link, svgPath }: CardDetails
): JSX.Element {
    return (
        <article className='col col--4'>
            <Link to={link} className={styles.communityCard} >
                <img
                    className={styles.communitySvg}
                    alt={title}
                    src={useBaseUrl(`${svgPath}`)}
                />
                <div className="text--left padding-top--sm padding-right--lg padding-bottom--lg padding-left--sm">
                    <h2 className={styles.communityCard_h2}>{title}</h2>
                    <p>{description}</p>
                </div>
            </Link>
        </article>
    );
}