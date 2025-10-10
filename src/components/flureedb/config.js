export const memoryConnOptions = (context) => {
	const config = {
		method: "memory",
		defaults: {
			context: context ?? {
				id: "@id",
				type: "@type",
				schema: "http://schema.org/",
				rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
				rdfs: "http://www.w3.org/2000/01/rdf-schema#",
				wiki: "https://www.wikidata.org/wiki/",
				skos: "http://www.w3.org/2008/05/skos#",
				f: "https://ns.flur.ee/ledger#",
			},
			did: {
				id: "did:fluree:TfHgFTQQiJMHaK1r1qxVPZ3Ridj9pCozqnh",
				public:
					"03b160698617e3b4cd621afd96c0591e33824cb9753ab2f1dace567884b4e242b0",
				private:
					"509553eece84d5a410f1012e8e19e84e938f226aa3ad144e2d12f36df0f51c1e",
			},
		},
	};
	return config;
};

export const triageContext = (document) => {
	if (Array.isArray(document)) {
		return document.map((t) => triageContext(t));
	}

	if (!document.hasOwnProperty("@context")) {
		return document;
	}

	const { "@context": context, ...rest } = document;
	return {
		context,
		...rest,
	};
};
