import React from 'react';
import Layout from '@theme/Layout';
import CommunityCard from './CommunityCard';
import styles from './Community.module.css';
import { CardDetails } from '../../components/CardDetails.interface';

const CommunityList: CardDetails[] = [
  {
    title: 'Github',
    svgPath: '/img/github-icon-light.svg',
    svgPathDark: '/img/github-icon-dark.svg',
    description: 'Where all the magic happens. All our source code lives here. Come check out our repos, projects, and get involved!',
    link: 'https://github.com/fluree'
  },
  {
    title: 'Community Forum',
    svgPath: '/img/heroicons/chat-alt-2.svg',
    description: 'Long-lived conversations about Fluree, feature requests, ideas, Fluree love, etc.',
    link: 'https://github.com/fluree/db/discussions'
  },
  {
    title: 'Slack',
    svgPath: '/img/Slack_Mark.svg',
    description: 'Come join our community members and Fluree teammates for realtime chat. ',
    link: 'https://launchpass.com/flureedb'
  },
  {
    title: 'YouTube',
    svgPath: '/img/youtube-icon.svg',
    description: 'All the Fluree video content lives on our Youtube. Come check out a webinar, walkthrough. ',
    link: 'https://youtube.com/c/fluree'
  },
  {
    title: 'Reddit',
    svgPath: '/img/Reddit_Mark_OnWhite.svg',
    description: 'Join us on the r/Fluree reddit page!',
    link: 'https://www.reddit.com/r/Fluree/'
  }
];

export default function Community(): JSX.Element {
  return (
    <Layout>
      <main className={styles.community}>
        <div className="container">
          <section className="row">
            {CommunityList.map((props, idx) => (
              <CommunityCard key={idx} {...props} />
            ))}
          </section>
		</div>
      </main>
    </Layout>
  );
}
