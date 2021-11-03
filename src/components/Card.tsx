import React from 'react'
import Link from '@docusaurus/Link';
import {CardDetails} from '../components/CardDetails.interface'


export default function Card({ title, description, link }: CardDetails): JSX.Element {
  return(
  <>
   <Link to={link} className="margin--md col col--5 card__link">
  <div className="card">
    <div className="card__header">
      <h2>{title}</h2>
    </div>
    <div className="card__body text__body">
      <p>
      {description}
      </p>
    </div>
    <div className="card__footer">
    </div>
  </div>
    </Link>
    </>
);
}