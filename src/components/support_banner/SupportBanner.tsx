import React from 'react';
import styles from '../../pages/community/Community.module.css';

export default function SupportBanner(): JSX.Element {
    return (
        <div className='container'>
            <div
                className='flex h-64 w-full'
                style={{
                    padding: '20px',
                    backgroundColor: 'var(--ifm-color-primary)',
                    color: 'white',
                }}
            >
				<div className={"flex h-full flex-none"}>
					<img src="/img/Computer_yeti.webp" />
				</div>
                <div className='flex flex-1 flex-col justify-center'>
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