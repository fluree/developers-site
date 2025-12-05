import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";
import HomepageCards from "../components/home_card/HomepageCards";
import styles from "./index.module.css";
import RightArrowSvg from "../../static/img/RightArrow.svg";
import { GlobalProvider } from "@site/src/hooks/useGlobal.jsx";

{/*
import SandboxDrawer from "../components/sandbox_drawer/SandboxDrawer";
*/}

import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import NexusIcon from "../assets/Brand_icon-nexus_48.svg";

const HomePage = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<div>
			<div className="hero">
				<div className="container">
					<div className="row">
						<div className="col">
							<h1 className="hero__title">Fluree Docs</h1>
							<p className="hero__subtitle">
								Guides and examples to help you become a Fluree expert
							</p>
							<div>
								<a
									href="/docs/learn/overview/"
									className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Get started
									<RightArrowSvg alt="right arrow icon" />
								</a>
							</div>
						</div>
						<div className="col--4 col--offset-2">
							<img src="/img/Yeti_Pose_08-tv-ui.webp" className="hero-image" />
						</div>
					</div>
				</div>
			</div>
			<div className="container homepage-toc">
				<div className="row">
					<div className="col">
						<div className="flex items-center">
							<AcademicCapIcon className="w-5 h-5 stroke-2 mr-2" />
							<h3>Learn</h3>
						</div>
						<div>
							<div className="doc-group">
								<h4>
									<a href="/docs/learn/overview/">Fluree Overview</a>
								</h4>
								<div className="description">
									What sets Fluree apart and how it can help you
								</div>
							</div>

							<div className="doc-group">
								<h4>
									<a href="/docs/learn/tutorial/introduction/">Tutorial</a>
								</h4>
								<div className="description">
									Learn the essentials of using Fluree and develop an accurate
									mental model of the system
								</div>
								{/* <div>
							<div><a href="/docs/learn/tutorial/introduction/">Introduction</a></div>
							<div><a href="/docs/learn/tutorial/fluree-data-model/">Fluree's Data Model</a></div>
							<div><a href="/docs/learn/tutorial/working-with-graph-data/">Working with Graph Data</a></div>
							<div><a href="/docs/learn/tutorial/collaborative-data/">Collaborative Data</a></div>
						  </div> */}
							</div>
							<div className="doc-group">
								<h4>
									<a href="/docs/learn/guides/working-with-context/">Guides</a>
								</h4>
								<div className="description">
									Get into the details of working with Open Standards and Fluree
								</div>
								{/* <div className="doc-sub-group">
									<h5>
										<a href="/docs/learn/guides/working-with-context/">
											Working with Context
										</a>
									</h5>
								</div>
								<div className="doc-sub-group">
									<h5>
										<a href="/docs/learn/guides/working-with-ontologies/">
											Working with Ontologies
										</a>
									</h5>
								</div> */}
							</div>
							<div className="doc-group">
								<h4>
									<a href="/docs/learn/foundations/json-ld/">Foundations</a>
								</h4>
								<div className="description">
									Deep dives into slices of Fluree functionality
								</div>
								{/* <div className="doc-sub-group">
							  <h5><a href="/docs/learn/foundations/from-tables-to-graphs/">From Tables to Graphs: How to Model Entities in a Graph Database </a></h5>
							  <div className="description">A guide to graph thinking for those coming from the relational world</div>
						  </div> */}
								{/* <div className="doc-sub-group">
									<h5>
										<a href="/docs/learn/foundations/json-ld/">JSON-LD</a>
									</h5>
									<div className="description">
										A brief introduction to JSON-LD as an RDF serialization
										format. Covers <code>@id</code>, <code>@context</code>,{" "}
										<code>@type</code>, and <code>@graph</code>.
									</div>
								</div> */}
								{/* <div className="doc-sub-group">
              	<h5><a href="/docs/learn/foundations/querying/">Querying in Depth</a></h5>
							  <div className="description">Learn the model for Fluree's query engine so that you can predict which queries will get you the results you want</div>
						  </div> */}
								{/* <div className="doc-sub-group">
									<h5>
										<a href="/docs/learn/foundations/data-access-control/">
											Data Access Control
										</a>
									</h5>
									<div className="description">
										Fine-grained rules for restricting who can see and access
										data
									</div>
								</div> */}
								{/* <div className="doc-sub-group">
									<h5>
										<a href="/docs/learn/foundations/semantic-vocabularies/">
											Semantic Vocabularies: What They Are and Why They Matter{" "}
										</a>
									</h5>
									<div className="description">
										An overview of semantic vocabularies and how they compare to
										traditional schemas
									</div>
								</div> */}
								{/* <div className="doc-sub-group">
									<h5>
										<a href="/docs/learn/foundations/verifiable-data/">
											The Components and Implications of Verifiable Data{" "}
										</a>
									</h5>
									<div className="description">
										An explanation of immutability and how Fluree's immutable
										data model enables provable data features such as Time
										Travel and History Queries
									</div>
								</div> */}
								{/* <div className="doc-sub-group">
							  <h5><a href="/docs/learn/foundations/architecture-overview/">Architecture Overview</a></h5>
							  <div className="description">An overview of how Fluree's verifiable data model impacts architecture</div>
						  </div> */}
							</div>
						</div>
					</div>
					<div className="col">
						<div className="flex items-center">
							<BookOpenIcon className="w-5 h-5 stroke-2 mr-2" />
							<h3>Reference</h3>
						</div>
						<div className="doc-group">
							<h4>
								<a href="/docs/reference/http-api/">Fluree HTTP API</a>
							</h4>
							<div className="description">
								Transacting, querying, and creating ledgers over HTTP
							</div>
						</div>
						{/* <div className="doc-group">
							<h4>
								<a href="/docs/reference/flureeql-query-syntax/">
									FlureeQL Query Syntax
								</a>
							</h4>
							<div className="description">
								Syntax in detail, covering aggregation, filtering, and more
							</div>
						</div>
						<div className="doc-group">
							<h4>
								<a href="/docs/reference/transaction-syntax/">
									Transaction Syntax
								</a>
							</h4>
							<div className="description">
								Inserting, deleting, and updating
							</div>
						</div> */}
						<div className="doc-group">
							<h4>
								<a href="/docs/reference/cookbook/">Cookbook</a>
							</h4>
							<div className="description">
								Examples of how to accomplish a set of basic use cases
							</div>
						</div>
						<div className="doc-group">
							<h4>
								<a href="/docs/reference/fluree-server-config/">Configure Fluree Server</a>
							</h4>
							<div className="description">
								A comprehensive description of the JSON-LD configuration file format for Fluree Server, with examples
							</div>
						</div>
						<div className="doc-group">
							<h4>
								<a href="/docs/reference/error-codes/">Error Codes</a>
							</h4>
							<div className="description">
								Lookup guide for each Fluree error code with links to supporting
								documentation
							</div>
						</div>
						{/* <div className="doc-group">
							<h4>
								<a href="/docs/reference/history-syntax/">History Syntax</a>
							</h4>
							<div className="description">
								Overview of syntax for fluree/history API with explanation &
								examples
							</div>
						</div>
						<div className="doc-group">
							<h4>
								<a href="/docs/reference/policy-syntax/">Policy Syntax</a>
							</h4>
							<div className="description">
								Overview of syntax for creating policies in Fluree with
								explanation & examples Explanation of each error code in Fluree
								with links to supporting documentation
							</div>
						</div>
						<div className="doc-group">
							<h4>
								<a href="/docs/reference/data-types/">Data Types</a>
							</h4>
							<div className="description">
								Overview of supported data types and examples of their uses
							</div>
						</div> */}
					</div>
					<div className="col">
						{/* <div className="doc-section mb-4">
							<div className="flex items-center">
								<BeakerIcon className="w-5 h-5 stroke-2 mr-2" />
								<h3>Examples</h3>
							</div>
							<div className="doc-group">
								<h4>
									<a href="/docs/examples/datasets/academic-credentials/introduction/">
										Datasets
									</a>
								</h4>
								<div className="description">
									End-to-end examples showing real-world data and the workflows
									for managing them
								</div> */}
								{/* <div className="doc-sub-group">
									<h5>
										<a href="/docs/examples/datasets/academic-credentials/introduction/">
											Sharing Secure, Trusted Data
										</a>
									</h5>
									<div className="description">
										One major problem that Fluree solves is providing{" "}
										<i>secure</i>, <i>trusted</i> data using only the database.
									</div>
								</div> */}
							{/* </div>
						</div> */}
						<div className="doc-section mb-4">
							<div className="flex items-center">
								<NexusIcon className="w-5 h-5 stroke-2 mr-2" />
								<h3>Fluree Cloud</h3>
							</div>
							<div className="doc-group">
								<h4>
									<a href="/docs/cloud/welcome">Welcome to Fluree Cloud!</a>
								</h4>
								<div className="description">
									Introduction and Instructions for Fluree's Hosted Service.
								</div>
							</div>
						</div>
						<div className="doc-section mb-4">
							<div className="flex items-center">
								<BeakerIcon className="w-5 h-5 stroke-2 mr-2" />
								<h3>Fluree Sense</h3>
							</div>
							<div className="doc-group">
								<h4>
									<a href="/docs/sense">
										Welcome to Fluree Sense Documentation
									</a>
								</h4>
								<div className="description">
									Introduction and Instructions for Fluree's Data Management Solution.
								</div>
							</div>
						</div>
						<div className="doc-section mb-4">
							<div className="flex items-center">
								<UserGroupIcon className="w-5 h-5 stroke-2 mr-2" />
								<h3>Community</h3>
							</div>
							<div className="doc-group">
								<ul>
									<li>
										<a href="https://github.com/fluree/">GitHub</a>
									</li>
									<li>
										<a href="https://discord.gg/pgjsvPa9Nm">Discord</a>
									</li>
									<li>
										<a href="mailto:support@flur.ee">Email</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<GlobalProvider>
			<Layout
				title={`${siteConfig.title}`}
				description={`${siteConfig.tagline}`}
			>
				<HomePage />
				{/* <SandboxDrawer /> */}
			</Layout>
		</GlobalProvider>
	);
}
