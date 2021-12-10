import React from 'react';
import clsx from 'clsx';
import styles from '../../pages/community/Community.module.css'
import ComputerYeti from '../../../static/img/Computer_yeti.svg';

export default function SupportBanner(): JSX.Element {
    return (
        <div className='container'>
            <div
                className='row'
                style={{
                    padding: '20px',
                    backgroundColor: 'var(--ifm-color-primary)',
                    color: 'white',
                }}
            >
                <ComputerYeti className={clsx('col col--2', styles.bannerYeti)} />
                <div className={clsx('col col--10', styles.bannerText)}>
                    <h2>Running into issues?</h2>
                    <p className={styles.bannerP}>
                        <span>Get help from our </span>
                        <a
                            href='https://github.com/fluree/db/discussions'
                            target='_blank'
                            style={{
                                color: 'white',
                                textDecoration: 'underline'
                            }}
                        >
                            <span>community discussion board</span>
                        </a>
                        <span> or reach out to </span>
                        <a
                            href='mailto:support@flur.ee'
                            target='_blank'
                            style={{
                                color: 'white',
                                textDecoration: 'underline'
                            }}>
                            <span>support@flur.ee.</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}