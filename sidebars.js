/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
	SenseSidebar: [
		"sense/index",
		{
			type: "category",
			label: "Getting Started with Sense",
			items: [
				"sense/Getting Started/System Glossary/System Glossary",
				{
					type: "category",
					label: "Getting Started",
					items: [
						"sense/Getting Started/Getting Started/System Configuration/index",
						"sense/Getting Started/Getting Started/User Management/index",
						"sense/Getting Started/Getting Started/Sso User Management/index",
						"sense/Getting Started/Getting Started/Profile Management & Header Controls/index",
						"sense/Getting Started/Getting Started/Global Search/index"
					]
				},
			],
		},
		{
			type: "category",
			label: "Classify Module",
			items: [
				{
					type: "category",
					label: "Tutorials & Walkthroughs",
					items: [
						{
							type: "doc",
							id: "sense/Classify Module/Tutorials & Walkthroughs/setting-up-your-data/setting-up-your-data",
							label: "Setting Up Your Data"
						},
						{
							type: "doc",
							id: "sense/Classify Module/Tutorials & Walkthroughs/catalogs-&-classification-tutorial/creating-a-catalog-semantic-ontology",
							label: "Catalogs & Classification Tutorial"
						},
						{
							type: "doc",
							id: "sense/Classify Module/Tutorials & Walkthroughs/classification-project-walkthrough/classification-project-walkthrough",
							label: "Classification Project Walkthrough"
						}
					]
				},
				{
					type: "category",
					label: "Introduction",
					items: [
						"sense/Classify Module/Introduction/overview-of-classify/index",
						"sense/Classify Module/Introduction/key-terms-and-concepts/index",
						"sense/Classify Module/Introduction/getting-started/index"
					]
				},
				{
					type: "category",
					label: "Data Sources",
					items: [
						"sense/Classify Module/Data Sources/viewing-data-sources/index",
						"sense/Classify Module/Data Sources/types-of-data-sources/index",
						"sense/Classify Module/Data Sources/creating-new-data-source-connection/index",
						"sense/Classify Module/Data Sources/assigning-data-source-admins/index",
						"sense/Classify Module/Data Sources/data-source-content-entitlements/index",
						"sense/Classify Module/Data Sources/editing-a-data-source/index",
						"sense/Classify Module/Data Sources/managing-data-source-entitlements/index",
						"sense/Classify Module/Data Sources/deleting-a-data-source/index"
					]
				},
				{
					type: "category",
					label: "Data Sets",
					items: [
						"sense/Classify Module/Data Sets/viewing-data-sets/index",
						"sense/Classify Module/Data Sets/data-set-object-roles-&-entitlements/index",
						"sense/Classify Module/Data Sets/creating-new Data Set/index",
						{
							type: "doc",
							id: "sense/Classify Module/Data Sets/map-data-set-schema/index",
							label: "Map Data Set Schema to Existing Catalog"

						},
						"sense/Classify Module/Data Sets/registering-profiling-a-data-set/index",
						"sense/Classify Module/Data Sets/editing-a-data-set/index",
						"sense/Classify Module/Data Sets/dataset-attributes/index",
						"sense/Classify Module/Data Sets/data-set-sample/index",
						"sense/Classify Module/Data Sets/data-set-relationships/index",
						"sense/Classify Module/Data Sets/export-semantic-graph/index",
						"sense/Classify Module/Data Sets/refreshing-&-re-profiling-data/index",
						"sense/Classify Module/Data Sets/editing-data-set-entitlements/index",
						"sense/Classify Module/Data Sets/related-projects/index",
						"sense/Classify Module/Data Sets/data-quality/index",
						"sense/Classify Module/Data Sets/dataset-attributes-feedback/index",
						"sense/Classify Module/Data Sets/classifying-a-data-set/index",
						"sense/Classify Module/Data Sets/deleting-a-data-set/index",
						"sense/Classify Module/Data Sets/exporting-a-data-set/index"
					]
				},
				{
					type: "category",
					label: "Catalogs",
					items: [
						"sense/Classify Module/Catalogs/Introduction To Catalogs/index",
						"sense/Classify Module/Catalogs/Catalog Object Entitlements/index",
						"sense/Classify Module/Catalogs/Viewing Catalogs/index",
						"sense/Classify Module/Catalogs/Creating A New Catalog/index",
						"sense/Classify Module/Catalogs/Importing Catalog Structure/index",
						{
							type: "doc",
							id: "sense/Classify Module/Catalogs/Import Semantic Files To Catalog/index",
							label: "Import Semantic Files to Catalog"
						},
						"sense/Classify Module/Catalogs/Semantic Objects & Concepts/index",
						"sense/Classify Module/Catalogs/Managing Catalogs/index",
						"sense/Classify Module/Catalogs/Viewing Ad Hoc Mappings To Catalogs/index",
						"sense/Classify Module/Catalogs/Giving Feedback To Ad Hoc Mappings/index",
						"sense/Classify Module/Catalogs/Tagging Of Data/index",
						"sense/Classify Module/Catalogs/Technical View Of Semantic Objects/index",
						"sense/Classify Module/Catalogs/Viewing Semantic Object Model/index",
						"sense/Classify Module/Catalogs/Publishing Semantic Data Set/index",
						"sense/Classify Module/Catalogs/Deleting A Catalog/index",
						"sense/Classify Module/Catalogs/Cloning A Catalog/index"
					]
				},
				{
					type: "category",
					label: "Classification Model Training",
					items: [
						"sense/Classify Module/Classification Model Training/Introduction To Classification Model Training/index",
						"sense/Classify Module/Classification Model Training/Training At Semantic Object Level/index",
						"sense/Classify Module/Classification Model Training/Training At Concept Level/index",
						"sense/Classify Module/Classification Model Training/Importing Concept Mappings/index",
						"sense/Classify Module/Classification Model Training/Multi User Feedback/index",
						"sense/Classify Module/Classification Model Training/Running The Model/index",
						"sense/Classify Module/Classification Model Training/Introduction to Tasks/index",
						"sense/Classify Module/Classification Model Training/Common Area For Viewing Tasks/index",
						"sense/Classify Module/Classification Model Training/Training Catalog Generated Tasks/index",
						"sense/Classify Module/Classification Model Training/Training Tasks in Bulk through Import/index",
						"sense/Classify Module/Classification Model Training/Reassigning Catalog Tasks/index"
					]
				},
				{
					type: "category",
					label: "Data Quality Rules",
					items: [
						"sense/Classify Module/Data Quality Rules/introduction-to-data-quality/index",
						"sense/Classify Module/Data Quality Rules/data-quality-main-views/index",
						"sense/Classify Module/Data Quality Rules/creating-technical-rule/index",
						"sense/Classify Module/Data Quality Rules/creating-business-rule/index",
						"sense/Classify Module/Data Quality Rules/mappings-in-business-rule/index",
						"sense/Classify Module/Data Quality Rules/out-of-the-box-rules/index",
						"sense/Classify Module/Data Quality Rules/re-running-rules/index",
						"sense/Classify Module/Data Quality Rules/scheduling-rules/index",
						"sense/Classify Module/Data Quality Rules/other-data-quality-rule-views/index",
						"sense/Classify Module/Data Quality Rules/rule-views-at-catalog-level/index",
						"sense/Classify Module/Data Quality Rules/rule-viewsa-at-dataset-level/index",
						"sense/Classify Module/Data Quality Rules/rule-applied-columns/index",
						"sense/Classify Module/Data Quality Rules/rule-exceptions/index",
						"sense/Classify Module/Data Quality Rules/importing-rules-in-bulk/index",
						"sense/Classify Module/Data Quality Rules/editing-a-rule-definition/index",
						"sense/Classify Module/Data Quality Rules/editing-rule-schedules/index",
						"sense/Classify Module/Data Quality Rules/editing-rule-entitlements/index",
						"sense/Classify Module/Data Quality Rules/rule-validations-&-error-handling/index",
						"sense/Classify Module/Data Quality Rules/cloning-a-rule/index",
						"sense/Classify Module/Data Quality Rules/deleting-rules/index"
					]
				},
				{
					type: "category",
					label: "Synonyms",
					items: [
						"sense/Classify Module/Synonyms/introduction-to-synonyms/index",
						"sense/Classify Module/Synonyms/creating-synonyms/index",
						"sense/Classify Module/Synonyms/managing-synonyms/index",
						"sense/Classify Module/Synonyms/importing-synonyms/index"
					]
				},
				{
					type: "category",
					label: "Semantic Object Classification Projects",
					items: [
						"sense/Classify Module/Semantic Object Classification Projects/introduction-to-classification-projects/index",
						"sense/Classify Module/Semantic Object Classification Projects/creating-a-classification-project/index",
						"sense/Classify Module/Semantic Object Classification Projects/four-eyes-check-&-entitlements/index",
						"sense/Classify Module/Semantic Object Classification Projects/viewing-project-home-screen/index",
						"sense/Classify Module/Semantic Object Classification Projects/viewing-project-results/index",
						"sense/Classify Module/Semantic Object Classification Projects/running-&-re-running-a-project/index",
						"sense/Classify Module/Semantic Object Classification Projects/editing-a-classification-project/index",
						"sense/Classify Module/Semantic Object Classification Projects/training-a-classification-project/index",
						"sense/Classify Module/Semantic Object Classification Projects/training-tasks-in-bulk-through-import/index",
						{
							type: "doc",
							id: "sense/Classify Module/Semantic Object Classification Projects/review-soc-project-prior-feedback/index",
							label: "Review Prior Feedback for SOC Projects"
						},

						"sense/Classify Module/Semantic Object Classification Projects/cloning-and-deleting-a-classification-project/index",
						{
							type: "doc",
							id: "sense/Classify Module/Semantic Object Classification Projects/view-summary-of-semantic-classifiers/index",
							label: "View Summary of Semantic Classifiers"
						}
					]
				},
				{
					type: "category",
					label: "Concept Parser Projects",
					items: [
						"sense/Classify Module/Concept Parser Projects/introduction-to-concept-parser-projects/index",
						{
							type: "doc",
							id: "sense/Classify Module/Concept Parser Projects/creating-a-project-initial-setup/index",
							label: "Creating a Concept Parser Project - Initial Setup"
						},
						{
							type: "doc",
							id: "sense/Classify Module/Concept Parser Projects/creating-a-project-training-&-project-data/index",
							label: "Creating a Project - Training & Project Data"
						},

						"sense/Classify Module/Concept Parser Projects/editing-a-concept-parser-project/index",
						"sense/Classify Module/Concept Parser Projects/four-eyes-check-&-entitlements/index",
						"sense/Classify Module/Concept Parser Projects/viewing-project-home-screen/index",
						"sense/Classify Module/Concept Parser Projects/viewing-project-results/index",
						"sense/Classify Module/Concept Parser Projects/training-a-concept-parser-project/index",
						"sense/Classify Module/Concept Parser Projects/training-tasks-in-bulk-through-import/index",
						{
							type: "doc",
							id: "sense/Classify Module/Concept Parser Projects/cloning-&-deleting-a-project/index",
							label: "Cloning & Deleting a Project"
						},

						"sense/Classify Module/Concept Parser Projects/export-&-publish-concept-parser-results/index"
					]
				},
				{
					type: "category",
					label: "Jobs",
					items: [
						"sense/Classify Module/Jobs/job-types/index",
						"sense/Classify Module/Jobs/viewing-jobs/index",
						"sense/Classify Module/Jobs/viewing-logs/index"
					]
				}
			]
		},
		{
			type: "category",
			label: "Resolve Module",
			items: [
				{
					type: "category",
					label: "Introduction",
					items: [
						"sense/Resolve Module/Introduction/Overview Of Resolve/index",
						"sense/Resolve Module/Introduction/Key Terms & Concepts/index"
					]
				},
				{
					type: "category",
					label: "Tutorials & Walkthroughs",
					items: [
						{
							type: "doc",
							id: "sense/Resolve Module/Tutorials & Walkthroughs/Setting Up Your Data/resolve-setting-up-your-data",
							label: "Setting up your Data"
						},
						{
							type: "doc",
							id: "sense/Resolve Module/Tutorials & Walkthroughs/Resolve Project Walkthrough/resolve-project-walkthrough",
							label: "Resolve Project Walkthrough"
						}


					]
				},
				{
					type: "category",
					label: "Adding & Managing Your Data",
					items: [
						"sense/Resolve Module/Adding & Managing Your Data/Loading your data sets/index",
						"sense/Resolve Module/Adding & Managing Your Data/getting-started/index"
					]
				},
				{
					type: "category",
					label: "Data Sources",
					items: [
						"sense/Resolve Module/Data Sources/Viewing Data Sources/index",
						"sense/Resolve Module/Data Sources/types-of-data-sources/index",
						"sense/Resolve Module/Data Sources/creating-new-data-source-connection/index",
						"sense/Resolve Module/Data Sources/assigning-data-source-admins/index",
						"sense/Resolve Module/Data Sources/data-source-content-entitlements/index",
						"sense/Resolve Module/Data Sources/editing-a-data-source/index",
						"sense/Resolve Module/Data Sources/managing-data-source-entitlements/index",
						"sense/Resolve Module/Data Sources/deleting-a-data-source/index"
					]
				},
				{
					type: "category",
					label: "Data Sets",
					items: [
						"sense/Resolve Module/Data Sets/Viewing Data Sets/index",
						"sense/Resolve Module/Data Sets/Creating New Data Set/index",
						{
							type: "doc",
							id: "sense/Resolve Module/Data Sets/Map Data Set Schema/index",
							label: "Map Data Set Schema"
						},

						"sense/Resolve Module/Data Sets/Registering Profiling A Data Set/index",
						"sense/Resolve Module/Data Sets/Editing A Data Set/index",
						"sense/Resolve Module/Data Sets/Dataset Attributes/index",
						"sense/Resolve Module/Data Sets/Data Set Sample/index",
						"sense/Resolve Module/Data Sets/Data Set Relationships/index",
						{
							type: "doc",
							id: "sense/Resolve Module/Data Sets/Export Semantic Graph/index",
							label: "Export Semantic Graph"
						},

						"sense/Resolve Module/Data Sets/Refreshing & Re-profiling Data/index",
						"sense/Resolve Module/Data Sets/Editing Data Set Entitlements/index",
						"sense/Resolve Module/Data Sets/Related Projects/index",
						"sense/Resolve Module/Data Sets/Data Quality/index",
						"sense/Resolve Module/Data Sets/Dataset Attributes Feedback/index",
						"sense/Resolve Module/Data Sets/Classifying A Data Set/index",
						"sense/Resolve Module/Data Sets/Deleting A Data Set/index",
						"sense/Resolve Module/Data Sets/Exporting A Data Set/index",
						"sense/Resolve Module/Data Sets/Data Set Object Roles & Entitlements/index",
					]
				},
				{
					type: "category",
					label: "Entities",
					items: [
						"sense/Resolve Module/entities/Introduction to Entities/index",
						"sense/Resolve Module/entities/Default Catalogs/index",
						"sense/Resolve Module/entities/Creating An Entity/index",
						{
							type: "doc",
							id: "sense/Resolve Module/entities/Entity Attributes Explained In Depth/index",
							label: "Entity Attributes Explained In-Depth"
						},
						"sense/Resolve Module/entities/Editing Existing Entity/index",
						"sense/Resolve Module/entities/Entity Attributes and Reference Data/index",
					]
				},
				{
					type: "category",
					label: "Resolution Projects",
					items: [
						"sense/Resolve Module/Resolution Projects/Introduction To Resolve Projects/index",
						"sense/Resolve Module/Resolution Projects/Creating A Resolve Project/index",
						{
							type: "doc",
							id: "sense/Resolve Module/Resolution Projects/Import Resolve Project Mappings/index",
							label: "Import Resolve Project Mappings"
						},
						"sense/Resolve Module/Resolution Projects/Four Eyes Check & Entitlements/index",
						"sense/Resolve Module/Resolution Projects/Training Matching Tasks/index",
						"sense/Resolve Module/Resolution Projects/Training Merging Tasks/index",
						"sense/Resolve Module/Resolution Projects/Fixing Tasks/index",
						"sense/Resolve Module/Resolution Projects/Managing Project Tasks By Admin/index",
						"sense/Resolve Module/Resolution Projects/Viewing Project Home Screen/index",
						"sense/Resolve Module/Resolution Projects/Viewing Entities Resolved/index",
						"sense/Resolve Module/Resolution Projects/Viewing Entities Mastered/index",
						"sense/Resolve Module/Resolution Projects/Cloning A Resolve Project/index",
						"sense/Resolve Module/Resolution Projects/Deleting A Project/index",
						{
							type: "doc",
							id: "sense/Resolve Module/Resolution Projects/Promote Resolve Project To Production/index",
							label: "Promote Resolve Project to Production",
						},
						{
							type: "doc",
							id: "sense/Resolve Module/Resolution Projects/Production Golden Record Changes/index",
							label: "Production Golden Record Changes",
						}


					]
				},
				{
					type: "category",
					label: "Data Quality Rules",
					items: [
						"sense/Resolve Module/Data Quality Rules/Introduction To Data Quality/index",
						"sense/Resolve Module/Data Quality Rules/Data Quality Main Views/index",
						"sense/Resolve Module/Data Quality Rules/Creating Technical Rule/index",
						"sense/Resolve Module/Data Quality Rules/Creating Business Rule/index",
						"sense/Resolve Module/Data Quality Rules/Mappings In Business Rule/index",
						"sense/Resolve Module/Data Quality Rules/Out Of The Box Rules/index",
						"sense/Resolve Module/Data Quality Rules/Re Running Rules/index",
						"sense/Resolve Module/Data Quality Rules/Scheduling Rules/index",
						"sense/Resolve Module/Data Quality Rules/Other Data Quality Rule Views/index",
						"sense/Resolve Module/Data Quality Rules/Rule Views At Catalog Level/index",
						"sense/Resolve Module/Data Quality Rules/Rule Views At Dataset Level/index",
						"sense/Resolve Module/Data Quality Rules/Rule Applied Columns/index",
						"sense/Resolve Module/Data Quality Rules/Rule Exceptions/index",
						"sense/Resolve Module/Data Quality Rules/Importing Rules In Bulk/index",
						"sense/Resolve Module/Data Quality Rules/Rule Validations & Error Handling/index",
						"sense/Resolve Module/Data Quality Rules/Editing A Rule Definition/index",
						"sense/Resolve Module/Data Quality Rules/Editing Rule Schedules/index",
						"sense/Resolve Module/Data Quality Rules/Editing Rule Entitlements/index",
						"sense/Resolve Module/Data Quality Rules/Deleting Rules/index",
						"sense/Resolve Module/Data Quality Rules/Cloning A Rule/index",
					]
				},
				{
					type: "category",
					label: "Golden Records",
					items: [
						"sense/Resolve Module/Golden Records/Data Quality In Resolve/index",
						"sense/Resolve Module/Golden Records/Data Quality Rules For Entities/index",
						"sense/Resolve Module/Golden Records/Editing Golden Records Manually/index",
						"sense/Resolve Module/Golden Records/Viewing Golden Records History/index",
						{
							type: "doc",
							id: "sense/Resolve Module/Golden Records/Golden Records Lineage & Relationships/index",
							label: "Golden Records Lineage & Relationships"
						},
						"sense/Resolve Module/Golden Records/Viewing Resolve Project Confidence/index",
						"sense/Resolve Module/Golden Records/Data Quality Of Golden Records/index",
						"sense/Resolve Module/Golden Records/Data Quality Exceptions In Golden Records/index",
						"sense/Resolve Module/Golden Records/Publishing Golden Records/index"
					]
				},
				{
					type: "category",
					label: "Jobs",
					items: [
						"sense/Resolve Module/Jobs/Job Types/index",
						"sense/Resolve Module/Jobs/Viewing Jobs/index",
						"sense/Resolve Module/Jobs/Viewing Logs/index"
					]
				}
			]
		},
		{
			type: "category",
			label: "Ingest",
			items: [
				"sense/Ingest/ingest-module"
			]
		}
	],
	"getting-started": [
		"getting-started/index",
		"getting-started/quick-start",
		"getting-started/installation",
		"getting-started/core-concepts",
	],
	learn: [
		"learn/index",
		{
			type: "category",
			label: "Foundations",
			items: [
				"learn/foundations/what-makes-fluree-different",
				"learn/foundations/how-fluree-stores-data",
				"learn/foundations/understanding-graph-relationships",
				"learn/foundations/from-tables-to-graphs",
				"learn/foundations/json-ld",
				"learn/foundations/understanding-context",
			],
		},
		{
			type: "category",
			label: "Working with Data",
			items: [
				"learn/working-with-data/inserting-data",
				"learn/working-with-data/updating-and-deleting-data",
				"learn/working-with-data/querying-basics",
				"learn/working-with-data/advanced-queries",
				"learn/working-with-data/context-patterns",
				"learn/working-with-data/time-travel-and-history",
			],
		},
		{
			type: "category",
			label: "Modeling Your Data",
			items: [
				"learn/modeling/classes-and-properties",
				"learn/modeling/building-ontologies",
				"learn/modeling/working-with-ontologies",
				"learn/modeling/shacl-validation",
				"learn/modeling/semantic-vocabularies",
				"learn/modeling/introduction-to-reasoning",
			],
		},
		{
			type: "category",
			label: "Security & Access Control",
			items: [
				"learn/security/data-access-control-concepts",
				"learn/security/writing-policies",
				"learn/security/verifiable-data",
			],
		},
		{
			type: "category",
			label: "Advanced Topics",
			items: [
				"learn/advanced/calculated-transactions",
				"learn/advanced/language-tags",
				"learn/advanced/architecture-overview",
				"learn/advanced/collaborative-data",
			],
		},
	],
	examples: [
		"examples/home",
		{
			type: "category",
			label: "Domain Examples",
			items: [
				{
					type: "category",
					label: "E-Commerce Catalog",
					items: [
						"examples/datasets/ecommerce/introduction",
						"examples/datasets/ecommerce/querying",
						"examples/datasets/ecommerce/transactions",
					],
				},
				{
					type: "category",
					label: "Org Chart",
					items: [
						"examples/datasets/org-chart/introduction",
						"examples/datasets/org-chart/querying",
						"examples/datasets/org-chart/reasoning",
					],
				},
				{
					type: "category",
					label: "Knowledge Base",
					items: [
						"examples/datasets/knowledge-base/introduction",
						"examples/datasets/knowledge-base/querying",
						"examples/datasets/knowledge-base/history",
					],
				},
				{
					type: "category",
					label: "Healthcare Records",
					items: [
						"examples/datasets/healthcare/introduction",
						"examples/datasets/healthcare/querying",
						"examples/datasets/healthcare/policies",
					],
				},
				{
					type: "category",
					label: "Supply Chain",
					items: [
						"examples/datasets/supply-chain/introduction",
						"examples/datasets/supply-chain/querying",
						"examples/datasets/supply-chain/history",
					],
				},
			],
		},
		{
			type: "category",
			label: "Feature Showcases",
			items: [
				{
					type: "category",
					label: "Policy & Access Control",
					items: [
						"examples/datasets/access-control/introduction",
						"examples/datasets/access-control/defining-policies",
						"examples/datasets/access-control/testing-policies",
					],
				},
				{
					type: "category",
					label: "Reasoning & Inference",
					items: [
						"examples/datasets/reasoning/introduction",
						"examples/datasets/reasoning/rules",
						"examples/datasets/reasoning/querying-inferred",
					],
				},
				{
					type: "category",
					label: "Full-Text Search",
					items: [
						"examples/datasets/full-text-search/introduction",
						"examples/datasets/full-text-search/search-queries",
					],
				},
				{
					type: "category",
					label: "SHACL Validation",
					items: [
						"examples/datasets/shacl-validation/introduction",
						"examples/datasets/shacl-validation/defining-shapes",
						"examples/datasets/shacl-validation/validation-errors",
					],
				},
				{
					type: "category",
					label: "Time-Travel & Audit",
					items: [
						"examples/datasets/time-travel/introduction",
						"examples/datasets/time-travel/history-queries",
					],
				},
			],
		},
		{
			type: "category",
			label: "Integration Guides",
			items: [
				{
					type: "category",
					label: "SQL Migration",
					items: [
						"examples/datasets/sql-migration/introduction",
						"examples/datasets/sql-migration/schema-mapping",
						"examples/datasets/sql-migration/query-comparison",
					],
				},
				{
					type: "category",
					label: "REST API Patterns",
					items: [
						"examples/datasets/rest-api/introduction",
						"examples/datasets/rest-api/crud-operations",
						"examples/datasets/rest-api/advanced-patterns",
					],
				},
			],
		},
		{
			type: "category",
			label: "Academic Credentials",
			items: [
				"examples/datasets/academic-credentials/introduction",
				"examples/datasets/academic-credentials/querying",
			],
		},
	],
	reference: [
		{
			type: "category",
			label: "HTTP API",
			items: [
				"reference/http-api/index",
				"reference/http-api/ledger-operations",
				"reference/http-api/transactions",
				"reference/http-api/queries",
				"reference/http-api/real-time",
				"reference/http-api/remote",
			],
		},
		{
			type: "category",
			label: "Querying",
			items: [
				{
					type: "category",
					label: "FlureeQL",
					items: [
						"reference/querying/index",
						"reference/querying/select-clauses",
						"reference/querying/where-clauses",
						"reference/querying/aggregations",
						"reference/querying/modifiers",
						"reference/querying/advanced-features",
					],
				},
				"reference/full-text-search",
				"reference/history-syntax",
			],
		},
		{
			type: "category",
			label: "SPARQL",
			items: [
				"reference/sparql-syntax",
			],
		},
		{
			type: "category",
			label: "Transactions",
			items: [
				"reference/transaction-syntax",
				"reference/data-types",
			],
		},
		{
			type: "category",
			label: "Schema & Validation",
			items: [
				"reference/shacl-validation",
				"reference/reasoning",
			],
		},
		{
			type: "category",
			label: "Security",
			items: [
				"reference/authentication",
				"reference/policy-syntax",
			],
		},
		{
			type: "category",
			label: "Configuration",
			items: [
				"reference/fluree-server-config",
			],
		},
		{
			type: "category",
			label: "Cookbook",
			items: [
				"reference/cookbook/index",
				"reference/cookbook/examples",
			],
		},
		"reference/error-codes",
	],
	cloud: [
		"cloud/welcome",
		{
			type: "category",
			label: "Getting Started",
			items: [{ type: "autogenerated", dirName: "cloud/getting-started" }],
		},
		{
			type: "category",
			label: "Dataset View",
			items: [
				"cloud/datasets/overview",
				"cloud/datasets/about",
				"cloud/datasets/settings",
				"cloud/datasets/notebooks",
				"cloud/datasets/policies",
				"cloud/datasets/view-data",
				// {
				// 	type: "category",
				// 	label: "Data Management",
				// 	items: [
				// 		{
				// 			type: "autogenerated",
				// 			dirName: "cloud/datasets/data-management",
				// 		},
				// 	],
				// },
				// { type: "autogenerated", dirName: "cloud/datasets/dataset-pages" },
			],
		},
		{
			type: "category",
			label: "How-To Guides",
			items: [
				"cloud/how-to/connect-apps",
				// "cloud/how-to/apply-policy",
				{
					type: "category",
					label: "Fluree + GenAI",
					items: [
						{
							type: "doc",
							id: "cloud/how-to/chat/quickstart",
							label: "Quickstart Guide",
						},
						{
							type: "category",
							label: "Data Agent",
							items: [
								{
									type: "doc",
									id: "cloud/how-to/chat/intro",
									label: "Introduction",
								},
								{
									type: "doc",
									id: "cloud/how-to/chat/with-unstructured",
									label: "Chat with Documents",
								},
								{
									type: "doc",
									id: "cloud/how-to/chat/with-structured",
									label: "Chat with Tables",
								},
								{
									type: "doc",
									id: "cloud/how-to/chat/local-mcp-server",
									label: "LLM Client Integration (MCP)",
								},
								// {
								// 	type: "doc",
								// 	id: "cloud/how-to/chat/with-ontology",
								// 	label: "Chat with Graph Data",
								// },
							],
						},
					],
				},
			],
		},
		{
			type: "category",
			label: "API Reference",
			items: [
				"reference/cloud-http-api",
			],
		},
	]

};