import { CardDetails } from "../section_card/CardDetails.interface";

export const HomepageCardDetails: CardDetails[] = [
  {
    title: "SmartFunctions",
    description: "Work through lessons on SmartFunctions and how to use them.",
    link: "/docs/guides/advanced/smart-functions/1",
    Svg: require("../../../static/img/landing-page-icons/icon-cap-gown.svg")
      .default,
  },
  {
    title: "Analytical Queries",
    description: "Learn how to fully leverage Fluree with Analytical Queries.",
    link: "/docs/guides/querying/query-advanced/5/",
    Svg: require("../../../static/img/landing-page-icons/icon-query.svg")
      .default,
  },
  {
    title: "Fluree Architecture",
    description: "Read more about the components which comprise Fluree.",
    link: "/docs/concepts/core-concepts/flakes/",
    Svg: require("../../../static/img/landing-page-icons/architects-compass.svg").default,
  },
  {
    title: "Transactions",
    description: "Learn how to use transactions to manage your data in Fluree.",
    link: "/docs/overview/transact/basics/",
    Svg: require("../../../static/img/landing-page-icons/icon-transaction.svg").default,
  },
  {
    title: "APIs",
    description:
      "Search reference material for the APIs Fluree has availaible.",
    link: "/docs/reference/http/overview/",
    Svg: require("../../../static/img/landing-page-icons/icon-apis.svg").default,
  },
  {
    title: "Schemas",
    description:
      "Best practices for building and transacting your schema into Fluree.",
    link: "/docs/guides/schema/1/",
    Svg: require("../../../static/img/landing-page-icons/icon-schemas.svg").default,
  },
];
