import { CardDetails } from "../CardDetails.interface";

export const HomepageCardDetails: CardDetails[] = [
    {
        title: 'SmartFunctions',
        description: 'Work through lessons on SmartFunctions and how to use them.',
        link: '/docs/guides/advanced/smart-functions/1',
        Svg: require('../../../static/img/heroicons/acadmic-cap.svg').default
    },
    {
        title: 'Analytical Queries',
        description: 'Learn how to fully leverage Fluree with Analytical Queries.',
        link: '/docs/guides/querying/query-advanced/5/',
        Svg: require('../../../static/img/heroicons/search-circle.svg').default
    },
    {
        title: 'Fluree Architecture',
        description: 'Read more about the components which comprise Fluree.',
        link: '/docs/concepts/core-concepts/flakes/',
        Svg: require('../../../static/img/heroicons/library.svg').default
    },
    {
        title: 'Transactions',
        description: 'Learn how to use transactions to manage your data in Fluree.',
        link: '/docs/overview/transact/basics/',
        Svg: require('../../../static/img/heroicons/shield-check.svg').default
    },
    {
        title: 'APIs',
        description: 'Search reference material for the APIs Fluree has availaible.',
        link: '/docs/reference/http/overview/',
        Svg: require('../../../static/img/heroicons/switch-horizontal.svg').default
    },
    {
        title: 'Schemas',
        description: 'Best practices for building and transacting your schema into Fluree.',
        link: '/docs/guides/schema/1/',
        Svg: require('../../../static/img/heroicons/book-open.svg').default
    }
];