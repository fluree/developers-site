import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import styles from './Community.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import { CardDetails } from '../../components/CardDetails.interface';

export default function CommunityCard(
        { title, description, link, svgPath, svgPathDark }: CardDetails
    ): JSX.Element {
    return (
        <article className='col col--4'>
            <Link to={link} >
                <div className={styles.communityCard} >
                    <div className="text--left">
                        {svgPathDark ?
                            <ThemedImage
                                className={styles.communitySvg}
                                alt={title}
                                sources={{
                                    light: useBaseUrl(`${svgPath}`),
                                    dark: useBaseUrl(`${svgPathDark}`)
                                }}
                            /> :
                            <img
                                className={styles.communitySvg}
                                alt={title}
                                src={useBaseUrl(`${svgPath}`)}
                            />
                        }
                    </div>
                    <div className="text--left padding-top--sm padding-right--lg padding-bottom--sm padding-left--sm">
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </article>
    );
}