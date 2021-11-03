import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Secure Ledger Technology',
    Svg: require('../../static/img/graph yeti.svg').default,
    description: (
      <>
        Fluree is built on a distributed ledger, with built-in security, data provenance, and decentralization features.
      </>
    ),
  },
  {
    title: 'Powerful Graph Database',
    Svg: require('../../static/img/chart yeti.svg').default,
    description: (
      <>
        Fluree serves your data via a semanticly connected graph database with a flexible query language and time travel capabilities.  
      </>
    ),
  },
  {
    title: 'Built for Developers',
    Svg: require('../../static/img/lying down yeti.svg').default,
    description: (
      <>
        Fully open source, extensible, and progammable, Fluree has been built with developer experience in mind. 
      </>
    ),
  },
];

const Feature = ({Svg, title, description}) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(){
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
